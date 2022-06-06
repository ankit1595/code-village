const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");
// const postController = require("../controllers/post_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users.js"));
router.get("/contact", homeController.contact);
router.get("/login", homeController.login);
router.get("/signup", homeController.signup);

module.exports = router;
