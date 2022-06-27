const express = require("express");
const router = express.Router();

const postsApi = require("../../../controllers/api/v2/post_api");

router.get("/", postsApi.index);

module.exports = router;
