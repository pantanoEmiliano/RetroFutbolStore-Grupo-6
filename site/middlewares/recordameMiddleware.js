const fs = require("fs");
const path = require("path");
function recordameMiddleware(req, res, next){
    next();
    if(req.cookies.recordame != undefined && req.session.usuariologueado == undefined){
    const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      if (users == ""){
        users = [];
      } else{
         const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
      }
      
      let ALoguearse
      
      for(let i = 0; i < users.length; i++){
        if (users[i].email == req.cookies.recordame){
          
             ALoguearse = users[i];
            break;
          }
        }
        req.session.usuarioLogueado = ALoguearse;
      }
}

module.exports= recordameMiddleware;