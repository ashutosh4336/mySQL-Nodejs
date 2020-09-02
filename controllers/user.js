const User = require('../models/User');

// @desc        Check User is Admin or Not
// @route       GET api/v1/user/isadmin
// @access      Private (Loggedin User)
exports.isAdmin = async (req, res, next) => {
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(400).json({ msg: "You're not Admin" });
  }
  res.status(200).json({ msg: 'you are Admin', user });
};

// @desc        Get all Registered User
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

// @desc        Get Single User
// @route       GET api/v1/shop/:id
// @access      Public

exports.getSingleUserMethod = async (req, res, next) => {
  try {
    const data = await User.scope('withoutPassword').findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: "User Doesn't Exist" });
    }
    return res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Update User
// @route       PUT api/v1/user/:id
// @access      Private (User)

exports.updateSingleUserMethod = async (req, res, next) => {
  try {
    if (req.body.role === 'admin') {
      return res
        .status(400)
        .json({ msg: 'Converting User to Admin is Not Permitted' });
    }
    const newUser = {
      name: req.body.name,
      email: req.body.email,
    };

    const existingUser = await User.findByPk(req.params.id);
    // console.log(newUser, existingUser);

    if (!existingUser) {
      return res.status(404).json({ msg: "User Doesn't Exist" });
    }

    await User.update(newUser, {
      where: { id: existingUser.id },
    });

    return res.status(200).json({ msg: 'Your User has been Updated' });
  } catch (err) {
    console.log(err);
  }
};

// @desc        Delete User
// @route       Delete api/v1/users/:id
// @access      Private (Admin)

exports.deleteSingleUserMethod = async (req, res, next) => {
  try {
    const data = await User.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ msg: "User Doesn't Exist" });
    }

    // console.log(data);
    await User.destroy({ where: { id: data.id } });

    return res.status(200).json({ msg: 'Your User has been Deleted' });
  } catch (err) {
    console.log(err);
  }
};

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTU5OTAyNzgzMSwiZXhwIjoxNTk5MjAwNjMxfQ.d1SM0BGUGbTHvmybtGMh3U_eDafNZ9x_iKgold4ebRE
