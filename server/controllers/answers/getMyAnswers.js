const { sequelize } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "내 답변 목록 불러오기 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;
  sequelize
    .query(
      `select i.title as interviews_title, i.id as interviews_id , b.answers_title, b.answer, b.questions_title,b.questions_id
      from interviews i
      join (select a.id as answers_title , a.answer, q.title as questions_title, a.questions_id, a.createdAt
            from answers a
            join questions q
            on a.questions_id = q.id
            where users_id = ` +
        id +
        `) b 
      on i.id = b.questions_id 
      order by b.createdAt desc;`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((result) => {
      if (!result) {
        res.status(400).send({
          message: "내 답변 목록 불러오기 : 데이터를 찾을 수 없습니다.",
        });
      } else {
        res.status(200).send({ answers: result });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "내 답변 목록 불러오기 Server Error" }); // Server error
    });
};
