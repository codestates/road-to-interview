"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class interviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.interviews.belongsTo(models.users, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });

      models.interviews.hasMany(models.questions, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
      models.interviews.hasMany(models.cate_inter, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
      models.interviews.hasMany(models.collections, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
    }
  }
  interviews.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      users_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "interviews",
    }
  );
  return interviews;
};
