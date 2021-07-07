"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // define association here
      Car.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Car.init(
    {
      carName: DataTypes.STRING,
      model: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Car",
      tableName: "cars",
      classMethods: {},
    }
  );

  return Car;
};
