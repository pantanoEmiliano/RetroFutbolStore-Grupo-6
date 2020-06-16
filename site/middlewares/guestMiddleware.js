function guestMiddleware(req, res, next){
    if(req.session.usuarioLogueado == undefined) {
        next();
    }else{
        res.send("Bienvenido "+ req.session.usuarioLogueado.email+" esta pagina es solo para visitantes")
    }
}
module.exports = guestMiddleware;