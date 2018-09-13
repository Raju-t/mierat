'use strict';
const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define('Largeinitial', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    notes: DataTypes.TEXT,
    available: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    image_id: DataTypes.INTEGER,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    lastModifiedBy: DataTypes.INTEGER
  });
}