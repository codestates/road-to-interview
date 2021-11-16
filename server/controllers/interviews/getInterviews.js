const { sequelize } = require("../../models");

module.exports = (req, res) => {
  let categorys_id =
    req.query.categorys_id === "" ? "" : req.query.categorys_id;
  let page = req.query.page === "" ? 0 : req.query.page;
  let size = req.query.size === "" ? 10 : req.query.size;
  let sql =
    `select i.id as interviews_id,i.title, i.description, u.nickname,u.src
from interviews i
join users u
on i.users_id = u.id
order by i.createdAt desc
limit ` +
    page +
    `,` +
    size +
    `;`;

  if (categorys_id !== "") {
    sql =
      `select a.id as interviews_id, a.title, a.description , u.nickname,u.src
      from (select i.id,i.title, i.description, i.users_id,i.createdAt
      from interviews i
      join cate_inters ci
      on ci.interviews_id = i.id
      where categorys_id = ` +
      categorys_id +
      `) a
      join users u
      on a.users_id = u.id
      order by a.createdAt desc
      limit ` +
      page +
      `,` +
      size +
      `;
      `;
  }
  sequelize
    .query(sql, { type: sequelize.QueryTypes.SELECT })
    .then((result_inter) => {
      console.log(result_inter);
      if (result_inter.length < 1) {
        res.status(200).send({
          interviews: result_inter,
          message: "인터뷰 리스트 데이터 : 데이터를 찾을 수 없습니다.",
        });
      } else {
        let userInfo = result_inter.map((el) => {
          let userInfo = {
            interviews_id: el.interviews_id,
            nickname: el.nickname,
            src: el.src,
          };
          delete el.nickname;
          delete el.src;
          return userInfo;
        });
        let interviews_ids = result_inter.map((el) => {
          return el.interviews_id;
        });

        sequelize
          .query(
            `select a.id as interviews_id,c.categorys_id,c.category,(select CEILING(count(*)/10) from interviews) as totalPage
            from categorys c
            join (select ci.categorys_id, i.id
                          from interviews i
                        join cate_inters ci
                        on i.id = ci.interviews_id
                                    where i.id in (` +
              interviews_ids.toString() +
              `)) a
            on c.categorys_id = a.categorys_id;`,
            { type: sequelize.QueryTypes.SELECT }
          )
          .then((result_cate) => {
            if (result_cate.length < 1) {
              res.status(400).send({
                message: "인터뷰 리스트 카테고리 : 데이터를 찾을 수 없습니다.",
              });
            } else {
              let totalPage = result_cate[0].totalPage;
              for (let i of result_inter) {
                for (let j of userInfo) {
                  if (i.interviews_id === j.interviews_id) {
                    delete j.interviews_id;
                    i["userInfo"] = j;
                  }
                }
              }

              for (let i of result_cate) {
                for (let j of result_inter) {
                  if (i.interviews_id === j.interviews_id) {
                    delete i.interviews_id;
                    delete i.totalPage;
                    if (j["categorys"] === undefined) {
                      j["categorys"] = [i];
                    } else {
                      j["categorys"].push(i);
                    }
                  }
                }
              }

              res.status(200).send({ interviews: result_inter, totalPage });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .send({ error, message: "인터뷰 리스트 카테고리 Server Error" }); // Server error
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "인터뷰 리스트 데이터 Server Error" }); // Server error
    });
};
