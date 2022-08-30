var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadApiRouter = require('./routes/upload');
var sendApiRouter = require('./routes/send');
var loginApiRouter = require('./routes/login');
var signupApiRouter = require('./routes/signup');


var app = express();
var cors = require("cors");
const fileupload = require("express-fileupload");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(fileupload());

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/send', sendApiRouter);
app.use('/upload', uploadApiRouter);
app.use('/login', loginApiRouter);
app.use('/signup', signupApiRouter);

// database
const dbURI = 'mongodb+srv://Miralllll:AJaGHuXu3LhvWqJO@resumedb.1q1wykf.mongodb.net/ResumeBDDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3040, "0.0.0.0", () => {
                        console.log(`Express web server started: http://0.0.0.0:3040}`);
                        console.log(`Serving content from /3040}/`);
                      }))
  .catch((err) => console.log(err));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

