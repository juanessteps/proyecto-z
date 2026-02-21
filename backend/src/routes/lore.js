const { Router } = require('express');
const loreEntries = require('../data/lore');

const router = Router();

router.get('/', (_req, res) => res.json(loreEntries));
router.get('/:id', (req, res) => {
    const item = loreEntries.find(e => e.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

module.exports = router;
