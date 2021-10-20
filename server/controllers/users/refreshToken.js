const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
} = require("../functions/tokenFunctions");
const { users } = require("../../models");

module.exports = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).send({ message: "로그인이 만료되었습니다." });
    return;
  }

  const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    res.status(401).send({ message: "일치하는 유저 정보가 없습니다." });
    return;
  }

  const { id } = refreshTokenData;
  users
    .findOne({ where: { id } })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "일치하는 유저 정보가 없습니다." });
        return;
      }
      const { nickname, email, id } = data.dataValues;
      const newAccessToken = generateAccessToken({ nickname, email, id });
      resendAccessToken(res, newAccessToken, { nickname, email, id });
    })
    .catch((err) => {
      console.log(err);
    });
};
