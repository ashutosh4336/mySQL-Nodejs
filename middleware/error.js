const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // console.log('Somthing error ========> ');

  let error = { ...err };

  error.message = err.message;

  if (err.name === 'SequelizeUniqueConstraintError') {
    // console.log(err.message);
    const message = `${err.message}`;
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message || 'Server Error' });
};

module.exports = errorHandler;
