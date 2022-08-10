const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const fileRouter = require('./routes/data.route');
const historyRouter = require('./routes/history.route');
const priceRouter = require('./routes/price.route');
const rootPath = process.env.PWD;


// Init express
const app = express();
// Init environment
dotenv.config();
// console.log(process.env);
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/data`, fileRouter);
app.use(`/api/v1/history`, historyRouter);
app.use(`/api/v1/price`, priceRouter);
app.use(`/file`,express.static(rootPath + '/file'));

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
