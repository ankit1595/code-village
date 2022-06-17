const Post = require("../models/post");

module.exports.create = function (req, res) {
  console.log(req.body);
  Post.create(
    { content: req.body.content, user: req.user._id },
    function (err, post) {
      if (err) {
        console.log("Error in adding post, error: ", err);
        return;
      }
      console.log("Added Post: ", post);
      return res.redirect("back");
    }
  );
};
