const Report = require("../models/reportModel");
const asyncHandler = require("express-async-handler");

// add a report
exports.addReport = asyncHandler(async (req, res) => {
  const { title, notice, category, creator, location, desc, photo } = req.body;

  const requiredFields = [
    "title",
    "notice",
    "category",
    "location",
    "desc",
    "photo",
  ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  try {
    const report = await Report.create({
      title,
      notice,
      creator,
      category,
      location,
      desc,
      photo,
    });

    if (report) {
      res.status(201).send(report);
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.fetchAllReports = asyncHandler(async (req, res, next) => {
  const report = await Report.find().sort({ $natural: -1 });
  if (report) {
    res.status(200).send(report);
  } else {
    throw new Error("something went wrong");
  }
});

// fetch based on ID
exports.fetchSpecific = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id });
  if (report) {
    res.status(200).send(report);
  } else {
    throw new Error("something went wrong");
  }
});

exports.updateReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findOne({ _id: req.params.id });
  if (!report) {
    throw new Error("report not found");
  }

  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (updatedReport) {
    res.status(201).send(updatedReport);
  } else {
    throw new Error("something went wrong");
  }
});

exports.updateStatus = asyncHandler(async (req, res, next) => {
  let reportStatus = "completed";
  let dataToSend = { reportStatus };

  console.log("dd");

  const report = await Report.findOne({ _id: req.params.id });
  if (!report) {
    throw new Error("report not found");
  }

  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    dataToSend,
    {
      new: true,
    }
  );

  if (updatedReport) {
    res.status(201).send(updatedReport);
  } else {
    throw new Error("something went wrong");
  }
});

exports.deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    throw new Error("report not found");
  }

  await Report.findByIdAndDelete(req.params.id);
  res.status(201).send("Deleted Succesfully");
});

// delete all reports permanently
exports.deleteAllReports = asyncHandler(async (req, res, next) => {
  try {
    // Delete all reports
    await Report.deleteMany({});
    res.json({ message: "All reports have been deleted." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting reports." });
  }
});
