const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie("user_id", 55);
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error; ", err);
    return;
  }
};

module.exports.contact = function (req, res) {
  return res.render("contact", {
    title: "Contact Us",
  });
};
