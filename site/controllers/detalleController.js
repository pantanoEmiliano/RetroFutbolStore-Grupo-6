const fs = require("fs");
const path = require("path");
let db = require("../database/models");
let detalle;
const detalleController =  {
  detalle: function(req, res) {
    db.Mitabla.findByPk(req.params.id, {
    //  console.log(detalle)        
    })
    .then(function(mytable) {
        res.render('detalle', {
          ALoguearse : req.session.usuarioLogueado,
          mytable: mytable
        });
      
    
    });
  },

  guardarId: function (req,res) {
  this.detalle.id  
    localStorage.setItem("guardarId", guardarId)
  },
  obtenerId: function(req,res) {
  let idPasado = localStorage.getItem("guardarId", guardarId)

  },
 },


module,exports = detalleController;
