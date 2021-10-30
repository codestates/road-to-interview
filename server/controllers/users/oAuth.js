const { users } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const { email, name, src } = req.body.profileObj;

  users
    .findOrCreate({
      where: {
        email,
      },
      defaults: {
        nickname: name,
        emailauth: true,
        src,
      },
    })
    .then(([result, created]) => {
      let id = "";
      if (!created) {
        //있을때
        id = result.dataValues.id;
      } else {
        //없을때(새로만들었을때)
        id = result.dataValues.id;
      }
      console.log(id);
      const accessToken = generateAccessToken({ name, email, id, src });
      const refreshToken = generateRefreshToken({ name, email, id, src });
      sendRefreshToken(res, refreshToken, { name, email, id, src });
      sendAccessToken(res, accessToken, { name, email, id, src });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "구글 로그인 : Server Error" }); // Server error
    });
};
