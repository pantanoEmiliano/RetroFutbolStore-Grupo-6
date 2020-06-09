const fs = require('fs');
const path = require('path');

const detalleController = (req, res) => {
  const id = req.params.id;

  const pathCamisetas = path.join(__dirname, '../data/productosDataBase.json');
  const camisetas = JSON.parse(fs.readFileSync(pathCamisetas, 'utf-8'));

  const camiseta = camisetas.find((individuo) => {
    return individuo.id == id
  });

  res.render('detalle', { 
    title: 'Camisetas',
    camiseta: camiseta
  });
};

module.exports = detalleController;