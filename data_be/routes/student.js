const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const passportJWT = require('../middleware/passportJWT');
const checkRole = require('../middleware/checkRole');


router.get('/', [
    passportJWT.isLogin,
    checkRole.isAdmin
], studentController.index);

// get by name
router.get('/:id', studentController.show);

// get by name
router.delete('/delete/:id', [
    passportJWT.isLogin,
    checkRole.isAdmin
], studentController.delete);

// update by name
router.put('/update/:id', [
    passportJWT.isLogin,
    checkRole.isAdmin
], studentController.update);

// post
router.post('/', [
    passportJWT.isLogin,
    checkRole.isAdmin
], studentController.insert);

module.exports = router;
