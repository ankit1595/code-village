module.exports.index = function (req, res) {
  return res.status(200).json({
    message: "Updated list of items",
    posts: [1, 2],
  });
};
