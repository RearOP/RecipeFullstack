require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/mongoose-connection");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profile_Router");
const recipeRouter = require("./routes/recipeRouter");
const categoryRouter = require("./routes/categoryRouter");
const commentsRouter = require("./routes/commentsRouter");
const ratingRouter = require("./routes/ratingRouter");
const Recipefilter = require("./routes/filterRoute");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/verifytoken");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./config/passport");

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true, // allow cookies to be sent
  })
);
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/RecipeDB",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/auth", userRouter);
app.use("/profile", profileRouter);
app.use("/recipe", recipeRouter);
app.use("/category", categoryRouter);
app.use("/comments", commentsRouter);
app.use("/rating", ratingRouter);
app.use("/filterRecipe", Recipefilter);
app.get("/check", verifyToken, (req, res) => {
  res.status(200).json({ loggedIn: true, user: req.user, role: req.user.role });
});

app.listen(3000);
