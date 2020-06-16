const multer = require("multer");
function imgpMiddleware(req, res, next) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/images");
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
        },
      });
      
      const upload = multer({ storage: storage });

    next();
}





  module.exports = imgpMiddleware;