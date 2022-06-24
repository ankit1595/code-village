const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  let post = await Post.findById(req.body.post);

  if (post) {
    let comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id,
    });
    post.comments.push(comment);
    post.save();

    if (req.xhr) {
      return res.status(200).json({
        data: { comment: comment },
        message: "Comment created",
      });
    }

    console.log("Added comment", comment);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await Comment.findById(req.params.id);
  if (comment && comment.user == req.user.id) {
    let postId = comment.post;
    comment.remove();

    let post = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment_id: req.params.id,
        },
        message: "Comment deleted!",
      });
    }

    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
