'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Media', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    originalFilename: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
