const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Address = require('./address');

const Product = sequelize.define('patient', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  phoneno: Sequelize.BIGINT,
  address: {
    type: Sequelize.INTEGER,
    references: {
      model: Address, // Can be both a string representing the table name or a Sequelize model
      key: 'id'
    }
  },
  isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
  }
});

module.exports = Product;
