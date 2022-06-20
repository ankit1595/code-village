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
    let posts = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    console.log("Added Post: ", posts);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in adding post, error: ", err);
    return;
  }
 
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id)
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

    await Comment.deleteMany({ post: req.params.id });
        return res.redirect("back");
      
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in adding post, error: ", err);
    return;
  }
};