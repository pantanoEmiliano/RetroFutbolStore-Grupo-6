const fs = require("fs");
const path = require("path");

const controller = {
  //aca creo el controlador en base a las dos propiedades que habias creado facu
  crearProducto: (req, res, next) => {
    res.render("crearProducto");
  },

  guardarProducto: (req, res, next) => {
    //esta es la propiedad que usamos para crear un nuevo producto
    const pathCamisetas = path.join(
      __dirname,
      "../data/productosDataBase.json"
    );
    const camisetas = JSON.parse(fs.readFileSync(pathCamisetas, "utf-8"));
    //tenes que instalar el modulo multer para que usemos la carga de la imagen
    const newCamiseta = {
      id: camisetas[camisetas.length - 1].id + 1,
      name: req.body.nombre,
      equipo: req.body.equipo,
      seleccion: req.body.seleccion,
      precio: req.body.precio,
      año: req.body.año,
      imagen: req.files[0].filename,
    };
    const camisetaToSave = [...camisetas, newCamiseta];
    fs.writeFileSync(pathCamisetas, JSON.stringify(camisetaToSave, null, " "));
    res.redirect("/producto");
  },
};

module.exports = controller;
