const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if(req.cookies.token) {
  //     token = req.cookies.token
  // }

  // Make sure token exist
  if (!token) {
    // console.log('no token');
    return next(
      new ErrorResponse(`Not Authorized to access the Resource.....1`, 401)
    );
  }

  try {
    // varify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse(`Not Authorized to access the Resource...2 ${err}`, 401)
    );
  }
});

// Grant access to specific Role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Not Authorized to access the Resource...3 ${err}`,
          401
        )
      );
    }
    next();
  };
};
