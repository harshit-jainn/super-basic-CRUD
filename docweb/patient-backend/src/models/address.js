const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Address = sequelize.define('address', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  addressInfo: Sequelize.STRING
});

module.exports = Address;
