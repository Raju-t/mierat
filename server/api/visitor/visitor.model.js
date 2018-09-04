'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('Visitor', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    time_of_entry: DataTypes.STRING,
    D1: DataTypes.BOOLEAN,
    D2: DataTypes.BOOLEAN,
    D3: DataTypes.BOOLEAN,
    notes: DataTypes.STRING
  });
}
