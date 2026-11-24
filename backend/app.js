const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// mongoose config
const connectMongoDB = require("./lib/mongoose/initial_mongoose");

const collegeRoute = require("./routes/college.route");
const authRoute = require("./routes/auth.route");

const { authMiddleware } = require("./middleware/authMiddleware");

const port = process.env.PORT || 4000;

app.use("/college", authMiddleware, collegeRoute);

app.use("/auth", authRoute);

app.post("/test-token", authMiddleware);

app.listen(port, async () => {
  await connectMongoDB();
  console.log(`Server berjalan di port ${port}`);
});
