const { sequelize } = require("../../models");

module.exports = (req, res) => {
  if (!req.params.id) {
    res
      .status(400)
      .send({ message: "인터뷰 질문 리스트 : 데이터가 부족합니다." });
    return;
  }

  const id = req.params.id;
  sequelize
    .query(
      `select q.id as questions_id, q.title, q.description, q.limit as limit_second
      from questions q
      where q.interviews_id = ` +
        id +
        `;`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then((questions) => {
      if (!questions) {
        res
          .status(400)
          .send({ message: "인터뷰 질문 리스트 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ questions });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "인터뷰 질문 리스트 Server Error" }); // Server error
    });
};
