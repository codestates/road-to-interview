const { users } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
const crypto = require("crypto");
module.exports = (req, res) => {
  const { email, password } = req.body;

  users
    .findOne({
      where: {
        email,
      },
    })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "로그인 : 일치하는 유저 정보가 없습니다." });
        return;
      }
      let dbPassword = data.dataValues.password;
      let { salt, emailauth } = data.dataValues;
      console.log(emailauth);
      if (emailauth === false) {
        res.status(409).json({
          emailauth: false,
          message: "로그인 : 이메일 인증을 완료하세요",
        });
      } else {
        let hashPassword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");

        if (dbPassword === "" && salt === "") {
          res.status(409).send({
            message:
              "로그인 : 회원가입하지 않았습니다. google 또는 카카오로 로그인해 주세요.",
          });
          return;
        } else if (dbPassword === hashPassword) {
          const { nickname, email, id, src } = data.dataValues;
          const accessToken = generateAccessToken({ nickname, email, id, src });
          const refreshToken = generateRefreshToken({
            nickname,
            email,
            id,
            src,
          });
          sendRefreshToken(res, refreshToken, { nickname, email, id, src });
          sendAccessToken(res, accessToken, { nickname, email, id, src });
        } else {
          res.status(409).send({ message: "로그인 : 비밀번호가 다릅니다." });
          return;
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "로그인 : Server Error" }); // Server error
    });
};
