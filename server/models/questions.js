"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.questions.belongsTo(models.interviews, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
      models.questions.hasMany(models.answers, {
        foreignKey: "questions_id",

        onDelete: "cascade",
      });
    }
  }
  questions.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      limit: DataTypes.INTEGER,
      interviews_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "questions",
    }
  );
  return questions;
};
