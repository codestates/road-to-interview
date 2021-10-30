"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cate_inter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cate_inter.belongsTo(models.interviews, {
        foreignKey: "interviews_id",
        onDelete: "cascade",
      });
      models.cate_inter.belongsTo(models.categorys, {
        onDelete: "cascade",
        foreignKey: "categorys_id",
        targetKey: "categorys_id",
      });
    }
  }
  cate_inter.init(
    {
      categorys_id: DataTypes.INTEGER,
      interviews_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cate_inter",
    }
  );
  return cate_inter;
};
