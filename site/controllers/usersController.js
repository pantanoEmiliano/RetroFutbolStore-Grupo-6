const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { check, validationResult, body } = require("express-validator");

const controller = {
  //crea controlador con sus propiedades

  root: (req, res, next) => {
    res.render("registro"); //viaja por get a la vista de form de registro
  },
  store: (req, res, next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

      const newUser = {
        id: users[users.length - 1].id + 1,
        name: req.body.name, //crea un nuevo usuario tomando los datos recibidos por los input del form
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10), //modulo bcrypt encripta el password del usuario
        telefono: req.body.telefono,
        avatar: req.files[0].filename,
      };

      const userToSave = [...users, newUser];
      fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, " "));
      res.redirect("/login");
    } else {
      res.render("registro", { errors: errors.errors });
    }
  },

  login: (req, res) => {
    res.render("login");
  },

  //tarea pendiente: la logica de la propiedad login esta terminada falta agregar la vista del loguin y las funcionalidades

  validate: (req, res, next) => {
    // Validar la contraseña utilizando bcrypt.compareSync()
    // muestra la vista de login con un error.
    // Redireccionar a la home
    let errors = validationResult(req);
    if (errors.isEmpty()){
      const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      if (users == ""){
        users = [];
      } else{
         const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      }
      
      let ALoguearse
      
      for(let i = 0; i < users.length; i++){
        if (users[i].email == req.body.email){
          if(bcrypt.compareSync(req.body.password, users[i].password)){
             ALoguearse = users[i];
            break;
          }
        }
      }
      if (ALoguearse == undefined){
        res.render("login", { errors: [{msg: "Credenciales invalidas"}
      
      ]});
      }

      req.session.usuarioLogueado = ALoguearse;
        if(req.body.recordame != undefined){
          res.cookie("recordame", ALoguearse.email,{ maxAge: 600000})
        }

      res.render("index", {users: users});

    }else {
     return res.render("login", { errors: errors.errors });
    }
    }

    
  
};

module.exports = controller;
