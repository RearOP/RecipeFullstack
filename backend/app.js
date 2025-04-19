const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/mongoose-connection");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true, // allow cookies to be sent
  })
);
require("dotenv").config();
app.use("/auth", userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
