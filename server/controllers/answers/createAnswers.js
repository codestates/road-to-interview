const { answers } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  // const  = req.body;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ message: "답변 제출 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;

  let created_answers = [];
  //[{answer,users_id,questions_id}]
  // answers
  //   .bulkCreate(created_answers)
  //   .then((result) => {
  //     const id = "";
  //     if (!result) {
  //       res.status(400).send({ message: "답변 제출 : 등록에 실패하였습니다." }); // Server error
  //     } else {
  //       id = result.dataValues.id;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).send({ error, message: "답변 제출 : Server Error" }); // Server error
  //   });
  res.status(500).send({ error, message: "답변 제출 : Server Error" }); // Server error
};
