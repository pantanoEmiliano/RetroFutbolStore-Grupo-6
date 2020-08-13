const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../database/models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const ustorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/users");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const uupload = multer({ storage: ustorage });

const indexController = require("../controllers/indexController");
const contactoController = require("../controllers/contactoController");
const registroController = require("../controllers/registroController");
const productoController = require("../controllers/productoController");
//const carritoController = require("../controllers/carritoController");
//const detalleController = require("../controllers/detalleController.js");
const usersController = require("../controllers/usersController.js");
const createController = require("../controllers/createController");
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const { check, validationResult, body } = require("express-validator");
const autHMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const recordameMiddleware = require("../middlewares/recordameMiddleware");

/* GET home page. */

router.get("/",recordameMiddleware, indexController.root);

router.get("/contacto", contactoController);
router.get("/registro",guestMiddleware, usersController.root);
router.get("/producto",recordameMiddleware, indexController.index);
router.get('/producto/:pag?', indexController.index);
router.get('/producto/detalle/:pag?', detalleController.detalle);
//  obtenerId: function(req,res) {
router.get("/detalle", detalleController.obtenerId);
router.get("/carrito/:id", carritoController);
router.post('/detalle', indexController.busqueda)
router.get("/detalle/:id", detalleController.detalle); //muestra detalle de producto
router.get("/create",createController.crearProducto); /* GET - Vista del formulario create */
router.get("/login", usersController.login); /* GET - Form to create */
router.get('/logout', usersController.logout);

router.get("/users", usersController.root);

router.get("/editar",createController.editar);
router.post("/create", upload.any(), createController.guardar); //Viaja por POST guarda nuevo producto

router.post('/registro',uupload.any(),[
  check('name').isLength({min:2}).withMessage('Nombre debe tener minimo 2 caracteres'),
  check('lastname').isLength({min:2}).withMessage('Apellido tener minimo 2 caracteres'),
  check('password').isLength({min:8}).withMessage('La Contraseña debe ser minimo 8 caracteres'),
  check('email').isEmail().withMessage('Correo incorrecto'),
  body('email').custom(async function(value){
    const usuario = await db.Usuario.findAll({where : {email:value}});
      if(usuario.length > 0){
        
        return Promise.reject();
      }
  }).withMessage('Usuario ya existente'),
],usersController.guardar);
//router.post("/registro",usersController.guardar);
/*router.post("/registro",uupload.any(),logDBMiddleware,
  [
    check("name").isLength({ min: 1 }).withMessage("Nombre: Este campo tiene que estar completo"),
    check("lastname").isLength({ min: 1 }).withMessage("Apellido: Este campo tiene que estar completo"),
    check("username").isLength({ min: 1 }).withMessage("Usuario: Este campo tiene que estar completo"),
    check("email").isEmail().withMessage("Correo: Este campo tiene que estar completo"),
    check("password").isLength({ min: 6 }).withMessage("Password: Minimo de 6 caracteres"),
    check("telefono").isLength().withMessage("Telefono: Email: Este campo tiene que estar completo"),
    body("email").custom(function(value){
      const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      if (users == ""){
        users = [];
      } else{
         const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      }

      for(let i = 0; i< users.length; i++){
        if (users[i].email == value){
          return false;
        }
      }
      return true;

    }).withMessage("Usuario existente"),
    
  ],usersController.store); //Viaja pòr POST crea nuevo usuario
//router.post("/login/", usersController.validate); /* Post - Validation login */
router.post("/login",[
  check("email").isEmail().withMessage("Correo: Email invalido"),
  check("password").isLength({ min: 6 }).withMessage("Password: Minimo de 6 caracteres"),
  ], usersController.validate);

  router.get("/check",function(req, res){
    if(req.session.usuarioLogueado == undefined){
      res.send("no estas logueado");
    }
    else{res.send("el usuario logueado es " + req.session.usuarioLogueado.email);}
  });
  router.get('/perfil', usersController.perfil);


module.exports = router;
