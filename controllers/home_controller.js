module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("user_id", 55);
  return res.render("home", {
    title: "Home",
  });
};

module.exports.contact = function (req, res) {
  return res.render("contact", {
    title: "Contact Us",
  });
};
