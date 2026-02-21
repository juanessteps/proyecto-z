const { Router } = require('express');
const c = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');

const router = Router();

router.get('/', c.getAll('lore_entries'));
router.get('/:id', c.getOne('lore_entries'));
router.post('/', auth, roleGuard('admin'), c.createLore);
router.put('/:id', auth, roleGuard('admin'), c.updateLore);
router.delete('/:id', auth, roleGuard('admin'), c.deleteRow('lore_entries'));

module.exports = router;
