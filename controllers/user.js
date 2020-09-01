const User = require('../models/User');

// @desc        Get all Listed Product
// @route       GET api/v1/shop
// @access      Private (Loggedin User)

exports.getAllUserMethod = async (req, res, next) => {
  try {
    const allUser = await User.scope('withoutPassword').findAll();
    res.status(200).json({ code: 200, count: allUser.length, data: allUser });
  } catch (err) {
    console.log(err);
  }
};
