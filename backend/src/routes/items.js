const { Router } = require('express');
const items = require('../data/items');

const router = Router();

router.get('/', (_req, res) => res.json(items));
router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

module.exports = router;
