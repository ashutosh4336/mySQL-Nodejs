const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    // type: Sequelize.UUID,
    // defaultValue: DataTypes.UUIDV4,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
