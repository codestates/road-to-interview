const { users } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
const crypto = require("crypto");
module.exports = (req, res) => {
  const { password, email } = req.body;

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
          .json({ message: "일치하는 유저 정보가 없습니다." });
        return;
      }
      let dbPassword = data.dataValues.password;
      let { salt, emailauth } = data.dataValues;
      if (emailauth === "no") {
        res
          .status(409)
          .json({ emailauth: false, message: "이메일 인증을 완료하세요" });
      } else {
        let hashPassword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");

        if (dbPassword === hashPassword) {
          const { nickname, email, id } = data.dataValues;
          const accessToken = generateAccessToken({ nickname, email, id });
          const refreshToken = generateRefreshToken({ nickname, email, id });
          sendRefreshToken(res, refreshToken, { nickname, email, id });
          sendAccessToken(res, accessToken, { nickname, email, id });
        } else {
          res.status(409).send({ message: "비밀번호가 다릅니다." });
          return;
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Server Error" }); // Server error
    });
};
