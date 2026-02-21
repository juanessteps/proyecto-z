const { Router } = require('express');
const tips = require('../data/tips');

const router = Router();

router.get('/', (_req, res) => res.json(tips));
router.get('/:id', (req, res) => {
    const item = tips.find(t => t.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
});

module.exports = router;
