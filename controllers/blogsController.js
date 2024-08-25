const Blogs = require("../models/blogsModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// add a blog
exports.addBlog = asyncHandler(async (req, res) => {
  const { title, description, photo } = req.body;

  const requiredFields = ["title", "description", "photo"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  try {
    const blog = await Blogs.create({
      title,
      description,
      photo,
    });

    if (blog) {
      res.status(201).send(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.fetchAllBlogs = asyncHandler(async (req, res, next) => {
  const blog = await Blogs.find().sort({ $natural: -1 });
  if (blog) {
    res.status(200).send(blog);
  } else {
    throw new Error("something went wrong");
  }
});

// fetch based on ID
exports.fetchSpecific = asyncHandler(async (req, res) => {
  const blog = await Blogs.findOne({ _id: req.params.id });
  if (blog) {
    res.status(200).send(blog);
  } else {
    throw new Error("something went wrong");
  }
});

exports.updateBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blogs.findOne({ _id: req.params.id });
  if (!blog) {
    throw new Error("blog not found");
  }

  const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedBlog) {
    res.status(201).send(updatedBlog);
  } else {
    throw new Error("something went wrong");
  }
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findById(req.params.id);

  if (!blog) {
    throw new Error("blog not found");
  }

  await Blogs.findByIdAndDelete(req.params.id);
  res.status(201).send("Deleted Succesfully");
});

exports.commentOnBlog = async (req, res) => {
  try {
    const { username, profile, comment } = req.body;

    // Find the post by ID
    const blog = await Blogs.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the post doesn't exist, return an error
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      profile,
      comment,
    };

    // Add the comment to the post's comments array
    blog.comments.push(newComment);

    // Save the updated post with the new comment
    await blog.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const { username, profile } = req.body;

    // Find the blog item by ID
    const blog = await Blogs.findById(req.params.id);

    // If the blog doesn't exist, return an error
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked this blog
    const hasLiked = blog.likes.some((like) => like.username === username);

    if (hasLiked) {
      // If the user has already liked it, remove their like
      blog.likes = blog.likes.filter((like) => like.username !== username);
      await blog.save();
      res.status(200).json({ message: "Unliked successfully" });
    } else {
      // If the user hasn't liked it yet, add their like
      const newLike = {
        username,
        profile,
      };
      blog.likes.push(newLike);
      await blog.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed To Like" });
  }
};
