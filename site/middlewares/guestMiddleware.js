function guestMiddleware(req, res, next){
    if(req.session.usuarioLogueado == undefined) {
        next();
    }else{
        res.render('perfil', {
            ALoguearse : req.session.usuarioLogueado,
            //perfil: ALoguearse
        });
    }
}
module.exports = guestMiddleware;