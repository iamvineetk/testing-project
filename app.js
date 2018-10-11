var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var broker = require('./routes/broker');
//var client = require('./routes/client');
var member = require('./routes/member');
var admin = require('./routes/admin');
var mail = require('./routes/mail');
var terminal = require('./routes/terminal');
var newsfeed = require('./routes/newsFeed');
//var downloads = require('./routes/downloads');
var cors = require('cors');

var app = express();
var io = require('socket.io')();
app.socketIO = io;
app.set('socketio', io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/broker', broker);
//app.use('/client', client);
app.use('/member', member);
app.use('/admin', admin);
app.use('/terminal',terminal);
app.use('/newsfeed', newsfeed);
//app.use('/downloads', downloads);
app.use('/mail', mail);

io.on('connection', function(socket){
  console.log('A client connection occurred!');
  socket.on('newOrderListEvent', function(data) {
    console.log('newOrderListEvent');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
