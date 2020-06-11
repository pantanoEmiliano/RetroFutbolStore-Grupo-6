const indexController = function (req, res, next) {
  res.render("index", { title: "RetroFutbolStore" });
};

module.exports = indexController;
