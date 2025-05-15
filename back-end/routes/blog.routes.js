const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const blogController = require("../controller/blog.controller");

router.post("/blog", auth, blogController.createBlog);
router.get("/blog", blogController.getBlogs);
router.put("/blog/:id", blogController.editblog);
router.delete("/blog/:id", blogController.deleteBlog);

module.exports = router;
