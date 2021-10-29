const { interviews } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  // const  = req.body;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ message: "인터뷰 생성 : 로그인이 만료되었습니다." });
    return;
  }
  const { users_id } = accessTokenData;
  interviews
    .create({
      users_id,
    })
    .then((result) => {
      const id = "";
      if (!result) {
        res
          .status(400)
          .send({ message: "인터뷰 생성 : 등록에 실패하였습니다." }); // Server error
      } else {
        id = result.dataValues.id;
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "인터뷰 생성 : Server Error" }); // Server error
    });
};
