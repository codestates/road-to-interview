const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
  isAuthorized,
} = require("../functions/tokenFunctions");

const { users } = require("../../models");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).send({
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
        const { nickname, email, id, src } = data.dataValues;
        const newAccessToken = generateAccessToken({
          nickname,
          email,
          id,
          src,
        });
        resendAccessToken(res, newAccessToken, { nickname, email, id, src });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "토큰 재발급 : Server Error" }); // Server error
      });
  } else {
    console.log(accessTokenData);
    const { nickname, email, id, src } = accessTokenData;
    resendAccessToken(res, req.headers["authorization"], {
      nickname,
      email,
      id,
      src,
    });
  }
};
