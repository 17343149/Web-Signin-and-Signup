var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var session = require('express-session');
var NedbStore = require('nedb-session-store')(session);
const sessionMiddleware = session({
	secret: "fas fas",
	resave: false,
	saveUninitialized: false,
	cookie:{
		path: '/',
		httpOnly: true,
		maxAge: 365*24*60*60*1000
	},
	store: new NedbStore({
		filename: 'path_to_nedb_persistence_file_db'
	})
})

var indexRouter = require('./routes/index');

var app = express();

app.use(sessionMiddleware);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(8000, function(){
	console.log('Listening on port 8000');
})

module.exports = app;
