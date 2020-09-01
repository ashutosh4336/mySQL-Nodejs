const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const sequelize = require('../config/db');

const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },

    role: {
      type: Sequelize.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },

    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },

    classMethods: {},
  }
);

// Match User Entered password to hashed password in DB
matchPassword = async function (enteredPassword, dbPassword) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

// Sign JWT and return
getSignedJwtToken = function (loggedInUser) {
  //   console.log('ID', loggedInUser);
  return jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = User;
