const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
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
        password: bcrypt.hashSync(req.body.password, 10), //modulo bcrypt encripta el password del usuario
        email: req.body.email,
        avatar: req.files[0].filename,
      };

      const userToSave = [...users, newUser];
      fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, " "));
      res.redirect("/producto");
    } else {
      res.render("registro", { errors: errors.errors });
    }
  },

  login: (req, res) => {
    res.render("login");
  },

  //tarea pendiente: la logica de la propiedad login esta terminada falta agregar la vista del loguin y las funcionalidades

  validate: (req, res) => {
    // Validar la contraseña utilizando bcrypt.compareSync()
    // muestra la vista de login con un error.
    // Redireccionar a la home
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find((user) => {
      return user.email == email;
    });

    if (!user) {
      res.render("login", {
        error: "Usuario no encontrado!",
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res.render("login", {
        error: "Password incorrecto!",
      });
    }

    res.send(user);
  },
};

module.exports = controller;
