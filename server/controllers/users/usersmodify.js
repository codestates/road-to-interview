const { users } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
const crypto = require("crypto");
module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "유저 정보 수정 : 사용자를 찾을 수 없습니다." });
    return;
  }
  const { id } = accessTokenData;
  const { nickname, password, email } = req.body;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");
  users
    .update(
      {
        nickname,
        password: hashPassword,
        email,
        salt,
      },
      {
        where: { id: id },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(201).send({ userInfo: { nickname, email, id } });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "유저 정보 수정 Server Error" }); // Server error
    });
};
