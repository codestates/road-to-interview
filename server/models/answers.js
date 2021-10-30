"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.answers.belongsTo(models.users, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.answers.belongsTo(models.questions, {
        foreignKey: "questions_id",
        onDelete: "cascade",
      });
      models.answers.hasMany(models.likes, {
        foreignKey: "answers_id",

        onDelete: "cascade",
      });
    }
  }
  answers.init(
    {
      answer: DataTypes.STRING,
      users_id: DataTypes.INTEGER,
      questions_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "answers",
    }
  );
  return answers;
};
