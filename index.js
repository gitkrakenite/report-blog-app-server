const express = require("express");
const cors = require("cors");
const { cyan } = require("colors");
const colors = require("colors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;

// DB connection
connectDB();

app.get("/", (req, res) => res.status(200).send("API working Well"));
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/reports", require("./routes/reportRoutes"));
app.use("/api/v1/blogs", require("./routes/blogsRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
