const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for developer
  // console.log(err);
  console.log(err.stack.red);

  //   Mongoose Bad object ID
  if (err.name === 'CastError') {
    const message = `Resource not found  ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field Value Entered';
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose ValidationError
  if (err.name === 'ValidationError') {
    // console.log(err.errors);
    const message = Object.values(err.errors).map((el) => el.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message || 'Server Error' });
};

module.exports = errorHandler;
