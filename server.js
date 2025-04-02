const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

const app = express();

//dotenv configuration
dotenv.config();
//connecting to mongodb database(check db.js file)
connectDb();

//midleware
app.use(cors());
//this will change all the incoming data to json
app.use(express.json()); //for parsing incoming requests with json payload
app.use(morgan("dev"));

//route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food server</h1>");
});
//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
