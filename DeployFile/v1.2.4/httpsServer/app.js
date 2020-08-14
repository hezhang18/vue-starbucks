var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

/*
var history = require('connect-history-api-fallback');
app.use(history({
	rewrites: [
		{
			from: /^\/store\/.*$/,
	      	to: function(context) {
	        	return context.parsedUrl.pathname;
	        }
		}
	]
}));
*/

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var selectionRouter = require('./routes/selection');
var beveragesRouter = require('./routes/beverages');
var foodRouter = require('./routes/food');
var coffeeRouter = require('./routes/coffee');
var merchandiseRouter = require('./routes/merchandise');
var storesRouter = require('./routes/stores');
var cityRouter = require('./routes/city');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 全局登录拦截
app.use(function(req, res, next){
	if(req.cookies.userID){
		next();
	}else{
		if(req.originginalUrl == '/account/' || req.originginalUrl == '/account/activity' || req.originginalUrl == '/account/rewards' || req.originginalUrl == '/account/profile'){
			res.json({
				status: '10001',
				msg: '当前未登录',
				result: ''
			})
		}else{
			next();
		}
	}
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/selection', selectionRouter);
app.use('/beverages', beveragesRouter);
app.use('/food', foodRouter);
app.use('/coffee', coffeeRouter);
app.use('/merchandise', merchandiseRouter);
app.use('/storelocation', storesRouter);
app.use('/cityinfo', cityRouter);

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

module.exports = app;
