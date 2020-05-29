const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const indexController = require("../controllers/indexController")
const contactoController = require("../controllers/contactoController")
const registroController = require("../controllers/registroController")
const productoController = require("../controllers/productoController")
const carritoController = require("../controllers/carritoController")
const detalleController = require('../controllers/detalleController.js')
const usersController = require("../controllers/usersController.js")
/* GET home page. */
router.get('/', indexController);
router.get('/contacto', contactoController);
router.get('/registro', registroController);
router.get("/producto", productoController);
router.get("/carrito", carritoController);
router.get('/detalle/:id', detalleController);//muestra detalle de producto
//router.get("/crear", productoController.crearProducto);lleva a formulario de carga de producto
//router.post("/crear", productoController.guardarProducto);crea poducto
router.post("/registro", usersController.store);
//router.post("/registro", usersController.validate);
//router.post("/registro", usersController.login);
//router.post("/registro", usersController.root);

router.get('/create/', usersController.root); /* GET - Form to create */
//router.post('/create/', upload.any(), usersController.store); /* POST - Store in DB */

router.get('/login/', usersController.login); /* GET - Form to create */
router.post('/login/', usersController.validate); /* Post - Validation login */





module.exports = router;
