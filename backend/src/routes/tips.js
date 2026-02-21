const { Router } = require('express');
const c = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const roleGuard = require('../middlewares/roleGuard');

const router = Router();

router.get('/', c.getAll('survival_tips'));
router.get('/:id', c.getOne('survival_tips'));
router.post('/', auth, roleGuard('admin'), c.createTip);
router.put('/:id', auth, roleGuard('admin'), c.updateTip);
router.delete('/:id', auth, roleGuard('admin'), c.deleteRow('survival_tips'));

module.exports = router;
