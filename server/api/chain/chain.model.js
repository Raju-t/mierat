'use strict';
const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define('Chain', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    color: DataTypes.STRING,
    notes: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}