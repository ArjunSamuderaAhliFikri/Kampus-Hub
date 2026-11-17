const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// mongoose config
const connectMongoDB = require("./lib/mongoose/initial_mongoose");

const authRoute = require("./routes/auth.route");
const collegeRoute = require("./routes/college.route");

const port = process.env.PORT || 4000;

app.use("/auth", authRoute);
app.use("/college", collegeRoute);

app.listen(port, async () => {
  await connectMongoDB();
  console.log(`Server berjalan di port ${port}`);
});
