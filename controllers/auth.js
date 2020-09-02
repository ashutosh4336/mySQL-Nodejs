const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc        LogIN User
// @route       POST api/v1/auth/login
// @access      Public

exports.loginMethod = asyncHandler(async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // validate email and Password
  if (!user.email || !user.password)
    return next(new ErrorResponse(`Provide the Required Fields`, 400));

  // check for user
  const findUser = await User.findOne({
    where: { email: user.email },
  });
  // console.log('FIND User', findUser);

  if (!findUser) return next(new ErrorResponse('Invalid Credential', 400));

  const isMatch = await matchPassword(user.password, findUser.password);
  // console.log(`ismatch ==> `, isMatch);
  if (!isMatch) return next(new ErrorResponse(`Invalid Credential`, 400));

  // Create Token
  const token = `Bearer ` + (await getSignedJwtToken(findUser));
  return res.status(200).json({
    code: 200,
    name: findUser.name,
    token,
  });
});

// @desc        SignUp User
// @route       POST api/v1/auth/login
// @access      Public

exports.signUpMethod = asyncHandler(async (req, res, next) => {
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  if (!user.name || !user.email || !user.password || !user.username)
    return next(new ErrorResponse(`Provide the Required Fields`, 400));

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const createdUser = await User.create(user);

  return res.status(201).json({
    code: 201,
    msg: 'User Registered',
    name: createdUser.name,
    email: createdUser.email,
  });
});
