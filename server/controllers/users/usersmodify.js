const { users } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
const crypto = require("crypto");
module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "유저 정보 수정 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;
  const { nickname, password, email, src } = req.body;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");

  users
    .findOne({
      where: { nickname },
    })
    .then((user_result) => {
      if (!user_result) {
        users
          .update(
            {
              nickname,
              password: hashPassword,
              email,
              salt,
              src,
            },
            {
              where: { id: id },
            }
          )
          .then((result) => {
            console.log(result);
            res.status(201).send({ userInfo: { nickname, email, id, src } });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({ message: "유저 정보 수정 : Server Error" }); // Server error
          });
      } else {
        if (user_result.dataValues.id === id) {
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
              res.status(201).send({ userInfo: { nickname, email, id, src } });
            })
            .catch((error) => {
              console.log(error);
              res
                .status(500)
                .send({ message: "유저 정보 수정 : Server Error" }); // Server error
            });
          0;
        } else {
          res
            .status(404)
            .send({ message: "유저 정보 수정 : 해당 닉네임이 존재합니다." });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "유저 정보 수정 : 찾기 Server Error" }); // Server error
    });
};
