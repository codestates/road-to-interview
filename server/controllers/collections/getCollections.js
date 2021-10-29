const { sequelize } = require("../../models");

module.exports = (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ message: "내 컬렉션 불러오기 : 데이터가 부족합니다." });
    return;
  }
  console.log(req.params.id);
  const id = req.params.id;
  sequelize
    .query(
      `select i.id as interviews_id, i.title, i.description, i.categorys_id, ca.category
      from interviews i
      join categorys ca
      on ca.categorys_id = i.categorys_id
      where i.id in (select interviews_id 
              from collections c
              join users u
              on c.users_id = u.id
              where u.id = ` +
        id +
        `);`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((questions) => {
      if (!questions) {
        res
          .status(400)
          .send({ message: "내 컬렉션 불러오기 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ questions });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "내 컬렉션 불러오기 Server Error" }); // Server error
    });
};
