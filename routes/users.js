const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/post", usersController.post);
router.get("/login", usersController.login);
router.get("/signup", usersController.signup);

module.exports = router;
