const express = require("express");
const router = express.Router();
const {
  allUsers,
  registerUser,
  loginUser,
  permanentlyDeleteUser,
  updateAccount,
  deleteAllUsers,
  toggleAdminRights,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/toggle", toggleAdminRights);
router.delete("/:id", permanentlyDeleteUser);
router.put("/:id", updateAccount);
router.get("/", allUsers);
router.delete("/all", deleteAllUsers); // delete all users permanently

module.exports = router;
