const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const indexController = require("../controllers/indexController");
const contactoController = require("../controllers/contactoController");
const registroController = require("../controllers/registroController");
const productoController = require("../controllers/productoController");
const carritoController = require("../controllers/carritoController");
const detalleController = require("../controllers/detalleController.js");
const usersController = require("../controllers/usersController.js");
const createController = require("../controllers/createController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const { check, validationResult, body } = require("express-validator");

/* GET home page. */

router.get("/", indexController);
router.get("/contacto", contactoController);
router.get("/registro", usersController.root);
router.get("/producto", productoController);
router.get("/carrito", carritoController);
router.get("/detalle/:id", detalleController); //muestra detalle de producto
router.get(
  "/create",
  createController.crearProducto
); /* GET - Vista del formulario create */
router.get("/login/", usersController.login); /* GET - Form to create */
router.get("/users", usersController.root);

router.post("/create", upload.any(), createController.guardarProducto); //Viaja por POST guarda nuevo producto
router.post("/registro",upload.any(),logDBMiddleware,
  [
    check("name").isLength(),
    check("lastname").isLength({ min: 1 }),
    check("password").isLength({ min: 6 }),
    check("email").isEmail(),
  ],
  usersController.store
); //Viaja pòr POST crea nuevo usuario
router.post("/login/", usersController.validate); /* Post - Validation login */

module.exports = router;
