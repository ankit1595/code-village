const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("Error while finding post in the db, error: ", err);
      return;
    }

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error in adding comment to the db, error: ", err);
            return;
          }
          post.comments.push(comment);
          post.save();

          console.log("Added comment", comment);
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment && comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
