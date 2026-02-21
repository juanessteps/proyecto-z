const { Router } = require('express');
const { getComments, createComment, deleteComment } = require('../controllers/commentController');
const auth = require('../middlewares/auth');

const router = Router();

router.get('/', getComments);
router.post('/', auth, createComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;
