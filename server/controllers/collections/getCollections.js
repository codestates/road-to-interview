const { sequelize } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "내 컬렉션 불러오기 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;
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
    .then((collections) => {
      if (!collections) {
        res
          .status(400)
          .send({ message: "내 컬렉션 불러오기 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ collections });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "내 컬렉션 불러오기 Server Error" }); // Server error
    });
};
