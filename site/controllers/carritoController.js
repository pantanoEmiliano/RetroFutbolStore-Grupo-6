
const carritoController = function(req, res, next) {
    res.render('carrito', { title: 'Carrito de Compras' });
};

module.exports = carritoController;