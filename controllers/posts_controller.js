const Comment = require("../models/comment");
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

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (post) {
      //.id means converting the object id into string
      if (post.user == req.user.id) {
        post.remove();

        Comment.deleteMany({ post: req.params.id }, function (err) {
          return res.redirect("back");
        });
      } else {
        return res.redirect("back");
      }
    }
  });
};
