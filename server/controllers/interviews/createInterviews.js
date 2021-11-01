const { interviews, cate_inter, questions } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const { title, description } = req.body;
  const categorys_data = req.body.categorys;
  const questionss = req.body.questions;
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ message: "인터뷰 생성 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;

  interviews
    .create({
      title,
      description,
      users_id: id,
    })
    .then((interview) => {
      if (!interview) {
        res
          .status(400)
          .send({ message: "인터뷰 생성 interview : 등록에 실패하였습니다." }); // Server error
      } else {
        interviews_id = interview.dataValues.id;
        new_cate = categorys_data.map((el) => {
          return { categorys_id: el["categorys_id"], interviews_id };
        });
        cate_inter
          .bulkCreate(new_cate)
          .then((cate_inters) => {
            if (!cate_inters) {
              res.status(400).send({
                message: "인터뷰 생성 cate_inters : 등록에 실패하였습니다.",
              });
            } else {
              new_questions = questionss.map((el) => {
                return {
                  title: el["title"],
                  description: el["description"],
                  limit: el["limit"],
                  interviews_id,
                };
              });

              questions
                .bulkCreate(new_questions)
                .then((question) => {
                  const id = "";
                  if (!question) {
                    res.status(400).send({
                      message: "인터뷰 생성 questions : 등록에 실패하였습니다.",
                    }); // Server error
                  } else {
                    res.status(201).send({
                      id: interviews_id,
                      title: interview.dataValues.title,
                      description: interview.dataValues.description,
                      categorys: cate_inters,
                      questions: question,
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  res
                    .status(500)
                    .send({
                      error,
                      message: "인터뷰 생성 questions : Server Error",
                    }); // Server error
                });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .send({
                error,
                message: "인터뷰 생성 cate_inters : Server Error",
              }); // Server error
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "인터뷰 생성 interview : Server Error" }); // Server error
    });
};
