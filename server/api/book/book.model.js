'use strict';
const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define('Book', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    isbn: DataTypes.STRING,
    weight: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}
