const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      default: "",
    },
    notice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "nope",
    },
    desc: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      default:
        "https://images.pexels.com/photos/4464884/pexels-photo-4464884.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },

    reportStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("reports", reportSchema);

module.exports = Business;
