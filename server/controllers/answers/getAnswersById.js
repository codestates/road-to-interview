const { sequelize } = require("../../models");

module.exports = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "인터뷰 답변 목록 불러오기 : 데이터가 부족합니다.",
    });
    return;
  }
  console.log(req.params.id);
  const interviews_id = req.params.id;
  sequelize
    .query(
      `select a.answer, a.id, a.questions_id,q.title,q.description, q.interviews_id
      from answers a
      join questions q
      on a.questions_id = q.id
      where q.interviews_id = ` +
        interviews_id +
        `
      and a.users_id in (select u.id 
                 from users u 
                 where u.manager = 1)
      order by a.questions_id asc, a.createdAt desc;`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((mobum) => {
      if (!mobum) {
        res.status(400).send({
          message:
            "인터뷰 답변 목록 모범 불러오기 : 데이터를 찾을 수 없습니다.",
        });
        return;
      } else {
        sequelize
          .query(
            `select a.answer, a.id, a.questions_id,q.title,q.description, q.interviews_id
          from answers a
          join questions q
          on a.questions_id = q.id
          where q.interviews_id = ` +
              interviews_id +
              `
          and a.users_id not in (select u.id 
                     from users u 
                     where u.manager = 1)
          order by a.questions_id asc, a.createdAt desc;`,
            { type: sequelize.QueryTypes.SELECT }
          )
          .then((answers) => {
            if (!answers) {
              res.status(400).send({
                message:
                  "인터뷰 답변 목록 일반 불러오기 : 데이터를 찾을 수 없습니다.",
              });
              return;
            } else {
              res.status(200).send({ mobum, answers });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({
              error,
              message: "내 답변 목록 일반 불러오기 Server Error",
            }); // Server error
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "내 답변 목록 모범 불러오기 Server Error" }); // Server error
    });
};
