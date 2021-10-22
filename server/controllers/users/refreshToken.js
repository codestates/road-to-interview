const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
  isAuthorized,
} = require("../functions/tokenFunctions");

const { users } = require("../../models");

module.exports = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "토큰 재발급 : 로그인이 만료되었습니다.(accessToken)" });
    return;
  }
  if (!refreshToken) {
    res
      .status(401)
      .send({
        message: "토큰 재발급 : 로그인이 만료되었습니다.(refreshToken)",
      });
    return;
  }

  const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    res
      .status(404)
      .send({ message: "토큰 재발급 : 일치하는 유저 정보가 없습니다." });
    return;
  }

  const { id } = refreshTokenData;
  users
    .findOne({ where: { id } })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "토큰 재발급 : 일치하는 유저 정보가 없습니다." });
        return;
      }
      const { nickname, email, id } = data.dataValues;
      const newAccessToken = generateAccessToken({ nickname, email, id });
      resendAccessToken(res, newAccessToken, { nickname, email, id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "토큰 재발급 : Server Error" }); // Server error
    });
};
