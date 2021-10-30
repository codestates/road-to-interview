"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.collections.belongsTo(models.users, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.collections.belongsTo(models.interviews, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
    }
  }
  collections.init(
    {
      users_id: DataTypes.INTEGER,
      interviews_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collections",
    }
  );
  return collections;
};
