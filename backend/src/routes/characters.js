const { Router } = require('express');
const c = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');

const router = Router();

router.get('/', c.getAll('characters'));
router.get('/:id', c.getOne('characters'));
router.post('/', auth, roleGuard('admin'), c.createCharacter);
router.put('/:id', auth, roleGuard('admin'), c.updateCharacter);
router.delete('/:id', auth, roleGuard('admin'), c.deleteRow('characters'));

module.exports = router;
