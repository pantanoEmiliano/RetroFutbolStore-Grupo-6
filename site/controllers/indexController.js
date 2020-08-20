z/*const indexController = function (req, res, next) {
  res.render("index", { title: "RetroFutbolStore" });
};*/
const recordameMiddleware = require("../middlewares/recordameMiddleware");


const db = require("../database/models");
const indexController ={
    root: function(req,res,next){
      res.render("index",{
        ALoguearse : req.session.usuarioLogueado,
      })
    },
    index:
    async function(req, res) {
        // db.Pelicula.findAll()
        // .then(function(peliculas){
        //     return res.render('listadoPeliculas', {peliculas: peliculas});
        // });
        let pagina = 0;
        const pag = req.params.pag;
        if (pag) {
            pagina = (req.params.pag - 1) * 5;
        }
        const total = await db.Mitabla.count('id');
            const mytable = await db.Mitabla.findAll({
            limit: 6,
            offset: pagina
        });
        
        res.render('producto',  {
            ALoguearse : req.session.usuarioLogueado,
            mytable: mytable,
            total: total
        });
    },
    busqueda: async function(req, res) {
      const camisetaBuscadas = await db.Mitabla.findAll({
          where: {
            equipo: {
              [db.Sequelize.Op.like]: '%' + req.body.search + '%'
            }
          }
       });
    
       res.render('camiseta' ,{
          ALoguearse : req.session.usuarioLogueado,
          mytable: camisetaBuscadas,
          total: undefined
      });
     },
}
module.exports = indexController;