const express = require('express');
const router = express.Router();
const publicationControler = require('../controllers/publication');
const commentControler = require('../controllers/comment');
const likeControler = require('../controllers/like');
const requestLimiter = require('../middlewares/requestLimiter');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-publication');

// CRUD PUBLICATION
router.post('/', auth, multer, /* requestLimiter, */ publicationControler.createPublication);
router.get('/', auth, publicationControler.getAllPublication);
router.get('/:id', auth, publicationControler.getOnePublication);
router.put('/', auth, multer, /* requestLimiter, */ publicationControler.modifyPublication);
router.delete('/', auth, publicationControler.deletePublication);

// LIKE/DISLIKE
router.post('/like', /* requestLimiter, */ likeControler.likePublication);

// COMMENT
router.post('/comment', auth, multer, /* requestLimiter, */ commentControler.createComment);
router.put('/comment', auth, multer, /* requestLimiter, */ commentControler.modifyComment);
router.delete('/comment', auth, /* requestLimiter, */ commentControler.deleteComment);


module.exports = router;