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
      `select c.id as collections_id ,a.interviews_id, a.title, a.description, a.users_id, a.nickname
      from (select i.id as interviews_id, i.title, i.description, i.users_id as users_id,u.nickname from interviews i join users u on i.users_id = u.id) a
      join collections c
      on a.interviews_id = c.interviews_id 
      where c.users_id = ` +
        id +
        `;`,
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
      res
        .status(500)
        .send({ error, message: "내 컬렉션 불러오기 Server Error" }); // Server error
    });
};
