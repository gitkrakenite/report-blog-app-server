const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, profile, password } = req.body;

  const lowerCaseUsername = username.toLowerCase();

  const requiredFields = ["username", "profile", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // check if the username already exists
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw new Error("Username already exists");
  }

  const user = await User.create({
    username: lowerCaseUsername,
    profile,
    password,
  });

  if (user) {
    res.status(201).json({
      status: "OK",
      message: "Registered Successfully",
      error: false,
      user: {
        _id: user.id,
        username: user.username,
        profile: user.profile,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    throw new Error("Invalid user data");
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const requiredFields = ["username", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // check if user exists
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error(`username not found in DB`);
  }

  if (user && password === user.password) {
    res.json({
      status: "OK",
      message: "Login Successfull",
      error: false,
      user: {
        _id: user.id,
        username: user.username,
        profile: user.profile,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    throw new Error("Incorrect password");
  }
});

// fetch all users
exports.allUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ $natural: -1 });
  if (users) {
    res.status(200).send(users);
    return;
  }

  throw new Error("Error Fetching Users");
});

exports.toggleAdminRights = asyncHandler(async (req, res) => {
  try {
    // Extract user ID from the request body
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Toggle the isAdmin value
    user.isAdmin = !user.isAdmin;

    // Save the updated user document
    await user.save();
    // console.log("reached");
    // Respond with the updated user data
    res.status(200).json({
      message: "User admin rights updated successfully",
      user,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

exports.updateAccount = asyncHandler(async (req, res) => {
  // check if user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User not found in DB");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(updatedUser);
});

// delete all users permanently
exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
  try {
    // Delete all users
    await User.deleteMany({});
    res.json({ message: "All users have been deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting users." });
  }
});

exports.permanentlyDeleteUser = asyncHandler(async (req, res) => {
  // check if user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User not found in DB");
  } else {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user._id);
  }
});
