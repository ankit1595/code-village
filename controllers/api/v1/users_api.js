const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid Username/Password",
      });
    }

    return res.status(200).json({
      message: "Sign In successful, here is token, pls keep it safe!  ",
      data: {
        token: jwt.sign(user.toJSON(), "codeVillage", { expiresIn: "10000" }),
      },
    });
  } catch (error) {
    console.log("******Error: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
