const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/login", usersController.login);
router.get("/signup", usersController.signup);
router.post("/create", usersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  usersController.createSession
);
router.get("/sign-out", usersController.destroySession);

module.exports = router;
