const { users } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const { email, name } = req.body.profileObj;

  users
    .findOrCreate({
      where: {
        email,
      },
      defaults: {
        nickname: name,
        emailauth: true,
      },
    })
    .then(([result, created]) => {
      const id = "";
      if (!created) {
        //있을때
        id = result.dataValues.id;
      } else {
        //없을때(새로만들었을때)
        id = result.dataValues.id;
      }
      const accessToken = generateAccessToken({ name, email, id });
      const refreshToken = generateRefreshToken({ name, email, id });
      sendRefreshToken(res, refreshToken, { name, email, id });
      sendAccessToken(res, accessToken, { name, email, id });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "구글 로그인 : Server Error" }); // Server error
    });
};
