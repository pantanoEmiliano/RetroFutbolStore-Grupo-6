function authMiddleware(req, res, next){
    if(req.session.usuarioLogueado == undefined) {
        next();
    }else{
        res.send("esta pagina es solo para usuarios")
    }
}
module.exports = authMiddleware;