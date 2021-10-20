const { users, photos } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const { imageUrl, email, name } = req.body.profileObj;

  users
    .findOrCreate({
      where: {
        email,
      },
      defaults: {
        nickname: name,
      },
    })
    .then(([result, created]) => {
      if (!created) {
        const id = result.dataValues.id;
        const accessToken = generateAccessToken({ name, email, id });
        const refreshToken = generateRefreshToken({ name, email, id });
        sendRefreshToken(res, refreshToken, { name, email, id });
        sendAccessToken(res, accessToken, { name, email, id });
      } else {
        const users_id = result.dataValues.id;
        photos
          .create({
            users_id,
            src: imageUrl,
          })
          .then((resu) => {
            if (!resu) {
              res.status(409).send({ message: "구글 로그인 사진 저장 실패" });
            } else {
              const accessToken = generateAccessToken({
                nickname,
                email,
                users_id,
              });
              const refreshToken = generateRefreshToken({
                nickname,
                email,

                users_id,
              });
              sendRefreshToken(res, refreshToken, {
                nickname,
                email,

                users_id,
              });
              sendAccessToken(res, accessToken, {
                nickname,
                email,

                users_id,
              });
            }
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "구글 로그인 Server Error" }); // Server error
    });
};
