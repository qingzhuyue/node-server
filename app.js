
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginConfig = require('./routes/login');
// const db = require("./mysql")
var app = express();

// 连接到数据库
// db.connect(err => {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }

//   console.log('Connected to the MySQL server.');
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
  // 允许来自任何源的请求
  res.header("Access-Control-Allow-Origin", "*");
  // 允许特定的方法类型，默认为 GET 和 POST
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  // 允许请求头（可选）
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === 'OPTIONS') {
      // 预检请求（OPTIONS）直接返回
      return res.sendStatus(200);
  }
  next();
})

app.use('/', indexRouter);
app.use('/api/usersList', usersRouter);
app.use("/api", loginConfig);

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
