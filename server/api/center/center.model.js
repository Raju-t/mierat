'use strict';
const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define('Center', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stone_type: DataTypes.STRING,
    color: DataTypes.STRING,
    diamond_type: DataTypes.STRING,
    stone_ct_weight: DataTypes.FLOAT,
    stone_kt_weight: DataTypes.FLOAT,
    notes: DataTypes.TEXT,
    available: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}