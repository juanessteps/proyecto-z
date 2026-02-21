const { Router } = require('express');
const characters = require('../data/characters');

const router = Router();

router.get('/', (_req, res) => res.json(characters));
router.get('/:id', (req, res) => {
    const item = characters.find(c => c.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

module.exports = router;
