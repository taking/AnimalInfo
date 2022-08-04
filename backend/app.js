var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var uploads = require('./routes/uploads.js');
=======
var data = require('./routes/data.js');
var prices = require('./routes/prices.js');
>>>>>>> 40b5cdef9c5027e5f9fb5dac9ae97337d353f5b2


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/uploads', uploads);
=======
app.use('/data', data);
app.use('/data/test', data);
app.use('/prices', prices);
>>>>>>> 40b5cdef9c5027e5f9fb5dac9ae97337d353f5b2



const port = 3010;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})


module.exports = app;
