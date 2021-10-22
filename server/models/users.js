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
      // models.users.belongsToMany(models.posts, {
      //   through: "users_posts",
      //   onDelete: "cascade",
      // });
      // models.users.hasMany(models.posts, {
      //   foreignKey: "users_id",
      // });
      // models.users.hasMany(models.photos, {
      //   foreignKey: "users_id",
      // });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      emailauth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
