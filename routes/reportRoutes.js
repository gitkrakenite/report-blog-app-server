const express = require("express");
const router = express.Router();

const {
  addReport,
  fetchAllReports,
  updateReport,
  deleteReport,
  deleteAllReports,
  fetchSpecific,
  updateStatus,
} = require("../controllers/reportController");

router.post("/", addReport);
router.get("/", fetchAllReports);
router.get("/:id", fetchSpecific);
router.put("/:id", updateReport);
router.put("/status/:id", updateStatus);
router.delete("/:id", deleteReport);
router.post("/admin", deleteAllReports);

module.exports = router;
