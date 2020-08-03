const fs = require("fs");
const path = require("path");
let db = require("../database/models");
const detalleController =  {
  detalle: function(req, res) {
    db.Mitabla.findByPk(req.params.id, {
      
        
    })
    .then(function(mytable) {
        res.render('detalle', {
          ALoguearse : req.session.usuarioLogueado,
          mytable: mytable
        });
    });
 },
};

module.exports = detalleController;
