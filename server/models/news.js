"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  news.init(
    {
      position: DataTypes.STRING,
      company: DataTypes.STRING,
      url: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "news",
    }
  );
  return news;
};
