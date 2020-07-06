// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const logDBMiddleware = require("../middlewares/logDBMiddleware")

const {check, valoidationResult, body} = require("express-validator")

// ************ Controller Require ************
//const usersController = require('../controllers/usersController');

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage })

/*** CREATE ONE PRODUCT ***/ 
/*router.get('/create/', usersController.root); /* GET - Form to create */
//router.post('/create/', upload.any(), usersController.store); /* POST - Store in DB */

//router.get('/login/', usersController.login); /* GET - Form to create */
//router.post('/login/', usersController.validate);
//router.post('/registro',upload.any(),[check("email").isEmail()], usersController.store); /* Post - Validation login */

module.exports = router;

