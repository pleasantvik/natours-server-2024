const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const TOURS_URL = '/api/v1/tours';
const USERS_URL = '/api/v1/users';

const app = express();
//* Middleware for modifying incoming request data.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // console.log(`Hello from middleware`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// READING DATA

app.use(TOURS_URL, tourRouter);
app.use(USERS_URL, userRouter);

module.exports = app;
