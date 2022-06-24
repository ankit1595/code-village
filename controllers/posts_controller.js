const Comment = require("../models/comment");
const Post = require("../models/post");

// module.exports.create = function (req, res) {
//   console.log(req.body);
//   Post.create(
//     { content: req.body.content, user: req.user._id },
//     function (err, post) {
//       if (err) {
//         console.log("Error in adding post, error: ", err);
//         return;
//       }
//       console.log("Added Post: ", post);
//       return res.redirect("back");
//     }
//   );
// };

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!",
      });
    }

    req.flash("success", "Post published!");
    console.log("Added Post: ", post);
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error in adding post, error: ", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted!",
        });
      }

      req.flash("success", "Post and associated comments deleted");

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
