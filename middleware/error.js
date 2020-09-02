const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  console.log('Somthing error ========> ');

  let error = { ...err };

  error.message = err.message;

  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = `something ashutsh123 `;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message || 'Server Error' });
};

module.exports = errorHandler;
