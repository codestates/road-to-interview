const { users } = require("../../models");
const crypto = require("crypto");
const { mailSend } = require("../functions/nodemailerFunctions");
module.exports = (req, res) => {
  if (
    req.body.nickname === "" ||
    req.body.password === "" ||
    req.body.email === "" ||
    req.body.src === ""
  ) {
    res.status(422).send({
      message: "회원 가입 : 누락된 회원정보가 있습니다.",
    });
    return;
  }
  let { nickname, password, email, src } = req.body;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");

  users
    .findOne({
      where: { email },
    })
    .then((email_creat) => {
      if (!email_creat) {
        users
          .findOrCreate({
            where: {
              nickname,
            },
            defaults: {
              email,
              password: hashPassword,
              salt,
              src,
            },
          })
          .then(([result, created]) => {
            if (!created) {
              res.status(409).send({
                nickname: "false",
                message: "회원 가입 : 이미 존재하는 닉네임입니다.",
              });
              return;
            } else {
              const users_id = result.dataValues.id;
              mailSend(email, salt);
              res
                .status(201)
                .send({ userInfo: { nickname, email, users_id, src } });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .send({ message: "회원 가입 : 닉네임 체크 Server Error" }); // Server error
            return;
          });
      } else {
        res.status(409).send({
          email: "false",
          message: "회원 가입 : 이미 존재하는 이메일입니다.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "회원 가입 : 이메일 체크 Server Error" }); // Server error
    });
};
