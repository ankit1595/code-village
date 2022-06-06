module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Users Profile",
  });
};

module.exports.post = function (req, res) {
  return res.render("post", {
    title: "Users Post",
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
