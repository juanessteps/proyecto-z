const { Router } = require('express');
const c = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');

const router = Router();

router.get('/', c.getAll('items'));
router.get('/:id', c.getOne('items'));
router.post('/', auth, roleGuard('admin'), c.createItem);
router.put('/:id', auth, roleGuard('admin'), c.updateItem);
router.delete('/:id', auth, roleGuard('admin'), c.deleteRow('items'));

module.exports = router;
