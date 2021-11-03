"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.likes, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.users.hasMany(models.collections, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.users.hasOne(models.interviews, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.users.hasMany(models.answers, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      emailauth: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      manager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      src: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
