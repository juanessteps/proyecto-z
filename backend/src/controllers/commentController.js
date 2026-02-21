const pool = require('../config/db');

// GET /api/comments?entity=characters&entityId=1
const getComments = async (req, res) => {
    const { entity, entityId } = req.query;
    if (!entity || !entityId) {
        return res.status(400).json({ error: 'entity and entityId query params required' });
    }
    try {
        const { rows } = await pool.query(
            `SELECT c.*, u.username
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.entity_type = $1 AND c.entity_id = $2
       ORDER BY c.created_at DESC`,
            [entity, parseInt(entityId)]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// POST /api/comments  (authenticated)
const createComment = async (req, res) => {
    const { entity_type, entity_id, content } = req.body;
    if (!entity_type || !entity_id || !content) {
        return res.status(400).json({ error: 'entity_type, entity_id, and content are required' });
    }
    try {
        const { rows } = await pool.query(
            `INSERT INTO comments (user_id, entity_type, entity_id, content)
       VALUES ($1,$2,$3,$4) RETURNING *`,
            [req.user.id, entity_type, entity_id, content]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// DELETE /api/comments/:id  (own comment or admin)
const deleteComment = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM comments WHERE id=$1', [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        if (rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        await pool.query('DELETE FROM comments WHERE id=$1', [req.params.id]);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getComments, createComment, deleteComment };
