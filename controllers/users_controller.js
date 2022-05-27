module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Users Profile",
  });
};

module.exports.post = function (req, res) {
  return res.render("post", {
    title: "Users Post",
  });
};
