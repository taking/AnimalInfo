var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var data = require('./routes/data.js');
var prices = require('./routes/prices.js');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', data);
app.use('/data/test', data);
app.use('/prices', prices);



const port = 3010;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})


module.exports = app;
