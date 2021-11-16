const { collections, sequelize } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "컬렉션 삭제하기 : 데이터가 부족합니다." });
    return;
  }

  const collections_id = req.params.id;

  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "컬렉션 삭제하기 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;

  sequelize
    .query(
      `select users_id from collections where id = ` + collections_id + `;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      if (result[0].users_id === id) {
        collections
          .destroy({
            where: { id: collections_id },
          })
          .then((result_2) => {
            res.status(200).send({ message: "해당 평가가 삭제되었습니다." });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .send({ error, message: "컬렉션 삭제하기 Server Error" }); // Server error
          });
      } else {
        res.status(400).send({ message: "작성자가 아닙니다." });
        return;
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "컬렉션 삭제하기 user 찾기 Server Error" }); // Server error
      return;
    });
};
