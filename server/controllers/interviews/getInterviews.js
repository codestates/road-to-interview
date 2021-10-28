const { sequelize } = require("../../models");

module.exports = (req, res) => {
  sequelize
    .query(
      `select i.id,i.title, i.description, i.users_id, c.category as name, c.categorys_id 
      from interviews i 
      join categorys c 
      on i.categorys_id = c.categorys_id;`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((result) => {
      if (!result) {
        res
          .status(400)
          .send({ message: "인터뷰 리스트 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ interviews: result });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "인터뷰 리스트 Server Error" }); // Server error
    });
};
