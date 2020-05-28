const contactoController = function(req, res, next) {
    res.render('contacto', { title: 'Contacto' });
};

module.exports = contactoController;