const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Users Profile",
  });
};

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("login", {
    title: "Login | CodeVillage",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "Sign Up | CodeVillage",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user while signing up", err);
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating  user while signing up", err);
          return;
        }

        return res.redirect("/users/login");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
