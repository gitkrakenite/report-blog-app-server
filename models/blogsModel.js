const mongoose = require("mongoose");

//comments
const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// like
const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
});

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://images.pexels.com/photos/4464884/pexels-photo-4464884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },

    comments: [commentSchema],
    likes: [likeSchema],
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blogs", blogsSchema);

module.exports = Blogs;
