const express = require('express');
const { body } = require('express-validator')
const router = express.Router();
const userController = require('../controller/userController');
const passportJWT = require('../middleware/passportJWT');

router.get('/', [ passportJWT.isLogin ], userController.index);

// router.get('/', userController.index);

router.post('/login', userController.login);

router.post('/register', [
    body('name').not().isEmpty().withMessage('Require Name'),
    body('email').not().isEmpty().withMessage('Require E-mail').isEmail().withMessage('Email Wrong'),
    body('password').not().isEmpty().withMessage('Require Password').isLength({min:3}).withMessage('Password require more than 3 chareacter')
], userController.register);

router.get('/profile', [ passportJWT.isLogin ], userController.profile);

module.exports = router;
