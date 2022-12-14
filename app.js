var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");

// middle --- halp to parse cookies
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var uploadApiRouter = require("./routes/upload");
var loginApiRouter = require("./routes/login");
var logoutApiRouter = require("./routes/logout");
var signupApiRouter = require("./routes/signup");
var resumesApiRouter = require("./routes/resumes");
var authApiRouter = require("./routes/isauth");

var app = express();
var cors = require("cors");
const fileupload = require("express-fileupload");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("trust proxy", 1);

app.use(fileupload());
app.use(methodOverride("_method"));

app.use(cors({ credentials: true, origin: "https://r-esume-b-uilder.herokuapp.com" }));
app.use("/files", express.static(path.join(__dirname, "upload")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware
app.use(express.static(path.join(__dirname, "public")));

// checking user for every get
// app.get('*', checkUser);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/upload", checkUser, uploadApiRouter);
app.use("/login", loginApiRouter);
app.use("/signup", signupApiRouter);
app.use("/resumes", checkUser, resumesApiRouter);
// app.use("/resumes/delete", checkUser, resumesApiRouter);
app.use("/logout", logoutApiRouter);
app.use("/isauth", authApiRouter);

// database
const dbURI =
  "mongodb+srv://Miralllll:GZKedTn7zVgC8xwB@resumebddb.w4694qq.mongodb.net/ResumeDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(process.env.PORT || 3050, "0.0.0.0", () => {
      console.log(
        `Express web server started: http://0.0.0.0:${
          process.env.PORT || 3050
        }}`
      );
      console.log(`Serving content from /${process.env.PORT || 3050}/`);
    })
  )
  .catch((err) => console.log(err));

app.proxy = true;

// Without session this cookie remains in the browser before we will close the browser.
app.get("/set-cookies", (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  // this makes accessing cookies easier
  res.cookie("newUser", false);
  // the third argument is session -- expires after one day (browser closed doesn't matter)
  // secure: true --- http secures protocol only
  // httpOnly: true -- no fronend access to it -- onyl transporting
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    domain: process.env.ORIGIN_HOSTNAME || "localhost",
    sameSite: 'none' // <-- add this
  });
  res.send("you got the cookies!");
});

// // we can excess cookies from any url handler
// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
