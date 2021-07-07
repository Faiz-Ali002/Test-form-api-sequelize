"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Car, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      phoneno: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      classMethods: {},
      //       User.hasOne(UserCheckin);
      // UserCheckin.belongsTo(User);
      // User.hasMany(UserAddress, {foreignKey:'user_id', targetKey:'id', as:'Address'});
      // User.belongsToMany(Role, {through: 'userRoles', as:'UserRoles'});
      // Role.belongsToMany(User, {through: 'userRoles', as:'UserRoles'});

      hooks: {
        beforeValidate: (user, option) => {
          user.dob = "2000";
          return user;
        },

        beforeDestroy: (user, Option) => {
          console.log("deleted");
        },
      },
    }
  );
  return User;
};
