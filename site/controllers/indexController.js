const indexController = function(req, res, next) {
    res.render('index', { title: 'Blog de Gatitos' });
};

module.exports = indexController;