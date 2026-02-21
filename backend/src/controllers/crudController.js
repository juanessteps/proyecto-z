const pool = require('../config/db');

const getAll = (table) => async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM ${table} ORDER BY created_at DESC`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getOne = (table) => async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM ${table} WHERE id = $1`,
            [req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// ---------- CHARACTERS ----------
const createCharacter = async (req, res) => {
    const { name, description, image_url, role_type } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    try {
        const { rows } = await pool.query(
            `INSERT INTO characters (name, description, image_url, role_type)
       VALUES ($1,$2,$3,$4) RETURNING *`,
            [name, description, image_url, role_type]
        );
        res.status(201).json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const updateCharacter = async (req, res) => {
    const { name, description, image_url, role_type } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE characters SET name=$1, description=$2, image_url=$3, role_type=$4
       WHERE id=$5 RETURNING *`,
            [name, description, image_url, role_type, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const deleteRow = (table) => async (req, res) => {
    try {
        const { rowCount } = await pool.query(
            `DELETE FROM ${table} WHERE id=$1`, [req.params.id]
        );
        if (!rowCount) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// ---------- LORE ----------
const createLore = async (req, res) => {
    const { title, content, chapter } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
    try {
        const { rows } = await pool.query(
            `INSERT INTO lore_entries (title, content, chapter) VALUES ($1,$2,$3) RETURNING *`,
            [title, content, chapter]
        );
        res.status(201).json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const updateLore = async (req, res) => {
    const { title, content, chapter } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE lore_entries SET title=$1, content=$2, chapter=$3 WHERE id=$4 RETURNING *`,
            [title, content, chapter, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// ---------- ITEMS ----------
const createItem = async (req, res) => {
    const { name, type, description, image_url } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'Name and type required' });
    try {
        const { rows } = await pool.query(
            `INSERT INTO items (name, type, description, image_url) VALUES ($1,$2,$3,$4) RETURNING *`,
            [name, type, description, image_url]
        );
        res.status(201).json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const updateItem = async (req, res) => {
    const { name, type, description, image_url } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE items SET name=$1, type=$2, description=$3, image_url=$4 WHERE id=$5 RETURNING *`,
            [name, type, description, image_url, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

// ---------- TIPS ----------
const createTip = async (req, res) => {
    const { title, content, difficulty } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
    try {
        const { rows } = await pool.query(
            `INSERT INTO survival_tips (title, content, difficulty) VALUES ($1,$2,$3) RETURNING *`,
            [title, content, difficulty || 'medium']
        );
        res.status(201).json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

const updateTip = async (req, res) => {
    const { title, content, difficulty } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE survival_tips SET title=$1, content=$2, difficulty=$3 WHERE id=$4 RETURNING *`,
            [title, content, difficulty, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

module.exports = {
    getAll, getOne, deleteRow,
    createCharacter, updateCharacter,
    createLore, updateLore,
    createItem, updateItem,
    createTip, updateTip,
};
