const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);
router.get("/login", usersController.login);
router.get("/sign-up", usersController.signup);
router.post("/create", usersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  usersController.createSession
);
router.get("/sign-out", usersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  usersController.createSession
);

module.exports = router;
