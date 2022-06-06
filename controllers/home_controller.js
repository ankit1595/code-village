module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.contact = function (req, res) {
  return res.render("contact", {
    title: "Contact Us",
  });
};

module.exports.login = function (req, res) {
  return res.render("login", {
    title: "Login | CodeVillage",
  });
};
module.exports.signup = function (req, res) {
  return res.render("signup", {
    title: "Sign Up | CodeVillage",
  });
};
