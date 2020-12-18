const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const requestLimiter = require('../middlewares/requestLimiter');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-profil');

// authentification 
router.post('/signup', userCtrl.signup);
router.post('/login', requestLimiter, userCtrl.login);

// elevate privileges
router.put('/privileges', auth, requestLimiter, userCtrl.grantPrivileges);

router.get('/users', auth, requestLimiter, userCtrl.getAllUsers);
router.get('/profil', auth, requestLimiter, userCtrl.getProfile);
router.put('/profil', auth, multer, requestLimiter, userCtrl.modifyProfile);
router.delete('/profil', auth, requestLimiter, userCtrl.deleteProfile);

module.exports = router;