'use strict';
const Sequelize = require('sequelize')
export default function(sequelize, DataTypes) {
  return sequelize.define('Movie', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    production: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    stars: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    genre: DataTypes.STRING,
    language: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modifiedBy: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}
