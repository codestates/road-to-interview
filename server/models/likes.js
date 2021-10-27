"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.likes.belongsTo(models.users, {
        onDelete: "cascade",
      });
      models.likes.belongsTo(models.answers, {
        onDelete: "cascade",
      });
    }
  }
  likes.init(
    {
      users_id: DataTypes.INTEGER,
      answers_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
