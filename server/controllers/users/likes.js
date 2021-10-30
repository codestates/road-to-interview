const { likes } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "좋아요 등록 : 데이터가 부족합니다." });
    return;
  }
  const { answers_id } = req.params.id;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ message: "좋아요 등록 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;
  likes
    .create({
      users_id: id,
      answers_id,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "좋아요 등록 : Server Error" }); // Server error
    });
};
