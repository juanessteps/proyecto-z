const { Router } = require('express');
const c = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');
const pool = require('../config/db');

const router = Router();

// Public routes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM maps ORDER BY order_num ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM maps WHERE id=$1', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin-only writes
router.post('/', auth, roleGuard('admin'), async (req, res) => {
    const { name, area, description, image_url, order_num } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    try {
        const { rows } = await pool.query(
            'INSERT INTO maps (name, area, description, image_url, order_num) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [name, area, description, image_url, order_num || 0]
        );
        res.status(201).json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.put('/:id', auth, roleGuard('admin'), async (req, res) => {
    const { name, area, description, image_url, order_num } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE maps SET name=$1, area=$2, description=$3, image_url=$4, order_num=$5 WHERE id=$6 RETURNING *',
            [name, area, description, image_url, order_num, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.delete('/:id', auth, roleGuard('admin'), async (req, res) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM maps WHERE id=$1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
