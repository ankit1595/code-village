module.exports.home = function (req, res) {
  return res.end("<h1> Home page </h1>");
  //   return res.render("home", {
  //     title: "Home",
  //   });
};

module.exports.contact = function (req, res) {
  return res.end("<h1> Contact us</h1>");
};
