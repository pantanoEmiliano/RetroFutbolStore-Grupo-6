const fs = require('fs');
const path = require('path');

const productoController = (req, res) => {
  const pathCamisetas = path.join(__dirname, '../data/pruebadejason.json');
  const camisetas = JSON.parse(fs.readFileSync(pathCamisetas, 'utf-8'));

  const internacionales = camisetas.filter((camiseta) => {
    return camiseta.id > 100
  });

  const nacionales = camisetas.filter((camiseta) => {
    return camiseta.id < 100
  });

  res.render('producto', { 
    title: 'Camisetas',
    nacionales: nacionales,
    internacionales: internacionales,
    camisetas: camisetas
  });
};

module.exports = productoController;