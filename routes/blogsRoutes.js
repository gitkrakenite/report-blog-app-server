const express = require("express");
const router = express.Router();

const {
  addBlog,
  fetchAllBlogs,
  updateBlog,
  deleteBlog,
  fetchSpecific,
  commentOnBlog,
  likeBlog,
} = require("../controllers/blogsController");

router.post("/", addBlog);
router.get("/", fetchAllBlogs);
router.get("/:id", fetchSpecific);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.post("/comment/:id", commentOnBlog);
router.post("/like/:id", likeBlog);

module.exports = router;
