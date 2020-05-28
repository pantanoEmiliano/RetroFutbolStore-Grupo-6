const registroController = function(req, res, next) {
    res.render('registro', { title: 'Registro' });
};

module.exports = registroController;