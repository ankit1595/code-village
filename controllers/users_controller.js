const User = require("../models/user");

module.exports.profile = function (req, res) {
  console.log(req.cookies.user_id);
  let tokenId = req.cookies.user_id;
  if (tokenId) {
    User.findById(tokenId, function (err, user) {
      if (err) {
        console.log("Error in finding user while getting user details", err);
        return;
      }

      if (user) {
        return res.render("profile", {
          title: "Users Profile",
          name: user.name,
          email: user.email,
        });
      } else {
        return res.redirect("/users/login");
      }
    });
  } else {
    return res.redirect("/users/login");
  }
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
  //steps for manual authentication
  //find username/email id in the database
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user while signing in", err);
      return;
    }

    if (user) {
      //handle password doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};
