const { sequelize } = require("../../models");

module.exports = (req, res) => {
  sequelize
    .query(`select * from categorys;`, { type: sequelize.QueryTypes.SELECT })
    .then((category) => {
      if (!category) {
        res
          .status(400)
          .send({ message: "카테고리 불러오기 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ category });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "카테고리 불러오기 Server Error" }); // Server error
    });
};
