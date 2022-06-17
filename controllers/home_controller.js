const Post = require("../models/post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 55);
  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

module.exports.contact = function (req, res) {
  return res.render("contact", {
    title: "Contact Us",
  });
};
