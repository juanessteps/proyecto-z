const { Router } = require('express');
const maps = require('../data/maps');

const router = Router();

router.get('/', (_req, res) => res.json([...maps].sort((a, b) => a.order_num - b.order_num)));
router.get('/:id', (req, res) => {
    const item = maps.find(m => m.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

module.exports = router;
