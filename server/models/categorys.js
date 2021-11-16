"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.categorys.hasMany(models.cate_inter, {
        foreignKey: "categorys_id",
        sourceKey: "categorys_id",
        onDelete: "cascade",
      });
    }
  }
  categorys.init(
    {
      category: DataTypes.STRING,
      categorys_id: {
        unique: true,
        type: DataTypes.INTEGER,
      },
      users_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "categorys",
    }
  );
  return categorys;
};
