'use strict';
const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define('Charm', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stone_type: DataTypes.STRING,
    color: DataTypes.STRING,
    diamond_type: DataTypes.STRING,
    stone_c_weight: DataTypes.FLOAT,
    stone_k_weight: DataTypes.FLOAT,
    image: DataTypes.STRING,
    notes: DataTypes.TEXT,
    available: DataTypes.BOOLEAN,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}