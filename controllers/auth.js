const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc        LogIN User
// @route       POST api/v1/auth/login
// @access      Public

exports.loginMethod = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    // validate email and Password
    if (!user.email || !user.password)
      return res
        .status(400)
        .json({ code: 400, msg: 'Provide the Required Fields' });

    // check for user
    const findUser = await User.findOne({
      where: { email: user.email },
    });
    // console.log('FIND User', findUser);

    if (!findUser)
      return res
        .status(400)
        .json({ code: 400, msg: 'Please Provide Valid Crendentials' });

    const isMatch = await matchPassword(user.password, findUser.password);
    // console.log(`ismatch ==> `, isMatch);
    if (!isMatch)
      return res.status(400).json({ code: 400, msg: `Invalid Credential` });

    // Create Token
    const token = await getSignedJwtToken(findUser);
    return res.status(200).json({
      code: 200,
      name: findUser.name,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

// @desc        SignUp User
// @route       POST api/v1/auth/login
// @access      Public

exports.signUpMethod = async (req, res, next) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // console.log(user);

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = await User.create(user);

    return res.status(201).json({
      code: 201,
      msg: 'User Registered',
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    });
  } catch (err) {
    console.log(err);
  }
};
