const path = require("path");
const fs = require("fs");
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







        