const fs = require("fs");

function logDBMiddleware(req, res, next) {
    fs.appendFileSync("DBlog.txt", "Se creo un registro al ingresar en " + req.url);

    next();
}

module.exports = logDBMiddleware;