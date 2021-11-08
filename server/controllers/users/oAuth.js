const { users } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const { email, nickname, src, emailauth } = req.body;

  users
    .findOrCreate({
      where: {
        email,
      },
      defaults: {
        nickname,
        emailauth,
        src,
      },
    })
    .then(([result, created]) => {
      let id = "";
      if (!created) {
        //emailauth 카카오 2 구글 3
        let auth = result.dataValues.emailauth;

        if (emailauth === auth) {
          id = result.dataValues.id;
        } else {
          if (auth === 1 || auth === 0) {
            res
              .status(400)
              .send({
                message: "이미 가입된 회원입니다. 이메일로 로그인 해주세요",
              });
            return;
          } else if (auth === 2) {
            res
              .status(400)
              .send({
                message: "이미 가입된 회원입니다. 카카오로 로그인 해주세요",
              });
            return;
          } else {
            res
              .status(400)
              .send({
                message: "이미 가입된 회원입니다. 구글로 로그인 해주세요",
              });
            return;
          }
        }
      } else {
        //없을때(새로만들었을때)
        id = result.dataValues.id;
      }

      const accessToken = generateAccessToken({ nickname, email, id, src });
      const refreshToken = generateRefreshToken({ nickname, email, id, src });
      sendRefreshToken(res, refreshToken, { nickname, email, id, src });
      sendAccessToken(res, accessToken, { nickname, email, id, src });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "oAuth 로그인 : Server Error" }); // Server error
    });
};
