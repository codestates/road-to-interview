"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rankings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rankings.init(
    {
      nickname: DataTypes.STRING,
      users_id: DataTypes.INTEGER,
      nickname: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rankings",
    }
  );
  return rankings;
};
