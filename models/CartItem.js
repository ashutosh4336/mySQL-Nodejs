const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qty: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
