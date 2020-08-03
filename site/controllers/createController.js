const fs = require("fs");
const path = require("path");
let db = require("../database/models");
const controller = {
  //aca creo el controlador en base a las dos propiedades que habias creado facu
  
  /*guardarProducto: (req, res, next) => {
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
  },*/
  /*const newProduct = {
  name: req.body.name,
  id_category: req.body.category,
  stock: req.body.stock,
  price: req.body.price,
  discount: req.body.discount,
  description: req.body.description,
  image: req.files[0].filename
};

db.Productos.create(newProduct).then(() => {
  res.redirect('/');
})*/
    crearProducto: (req, res, next) => {
    res.render("crearProducto");
    },

    guardar: function(req, res) {
  
      const nuevoProducto = {
      equipo: req.body.equipo,
      precio: req.body.precio,
      seleccion: req.body.seleccion,
      año: req.body.año,
      imagen: req.files[0].filename,
     };

    db.Mitabla.create(nuevoProducto).then(()=> {
      res.redirect("/producto")
      })
  },
  editar: async (req,res) => {
    const product = await db.Mitabla.findByPk(req.params.productId,{
      
    });res.render('editarProducto', {
            
      product:product,
      
      
      session:req.session.userLoginSession
  });
    
   
    
    
},
  update: function(req,res) {
    db.Product.update({
        code_article: req.body.code_article,
        title: req.body.title,
        description_product: req.body.description_product,
        gender: req.body.femenino,
        date_up: req.body.date_up,
        price: req.body.price,
        price_discount: req.body.price_discount,
        colour: req.body.colour,
        category_id: req.body.type_cloth,
    },{
        where: {
            id: req.params.productId,
        }
    });
    db.Product_Size.update({
        size_id: req.body.size_id,
        units:req.body.units
    },{
        where:{
            product_id: req.params.productId
        }
    })
     res.redirect('/products/edit/' + req.params.productId );
},

};
module.exports = controller;
