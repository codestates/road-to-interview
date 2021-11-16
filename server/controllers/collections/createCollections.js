const { collections } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  // const  = req.body;
  if (!req.params.id) {
    res
      .status(400)
      .send({ message: "내 컬렉션 불러오기 : 데이터가 부족합니다." });
    return;
  }
  const interviews_id = req.params.id;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "컬렉션 추가하기 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;

  collections
    .findOrCreate({
      where: {
        users_id: id,
        interviews_id,
      },
    })
    .then(([collections, created]) => {
      const id = "";
      if (!created) {
        res
          .status(400)
          .send({ message: "컬렉션 추가하기 : 이미 등록되어 있습니다." }); // Server error
        return;
      } else {
        res.status(201).send({ collections });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "컬렉션 추가하기 : Server Error" }); // Server error
    });
};
