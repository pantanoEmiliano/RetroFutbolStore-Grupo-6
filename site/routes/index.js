const express = require('express');
const router = express.Router();
const indexController = require("../controllers/indexController")
const contactoController = require("../controllers/contactoController")
const registroController = require("../controllers/registroController")
const productoController = require("../controllers/productoController")
const carritoController = require("../controllers/carritoController")
const detalleController = require('../controllers/detalleController.js')

/* GET home page. */
router.get('/', indexController);
router.get('/contacto', contactoController);
router.get('/registro', registroController);
router.get("/producto", productoController);
router.get("/carrito", carritoController);
router.get('/detalle/:id', detalleController);//muestra detalle de producto
//router.post("/detalle", detalleController.store);//sube un nuevo produto




module.exports = router;
