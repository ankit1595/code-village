const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "Users Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("Unathorized");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("******Multer error: ", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          // this is saving the path of the uploaded file into the avatar field of the User Database
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        console.log(req.file);
        user.save();

        req.flash("success", "Profile updated");
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unathorized");
  }
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
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");

    return res.redirect("/");
  });
};
