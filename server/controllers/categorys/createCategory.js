const { categorys } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .send({ message: "카테고리 등록하기 : 데이터가 부족합니다." });
    return;
  }
  const { categorys_id, category } = req.body;
  console.log(category);
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: "카테고리 등록하기 : 로그인이 만료되었습니다." });
    return;
  }
  const { id } = accessTokenData;

  categorys
    .findOrCreate({
      where: {
        categorys_id,
      },
      defaults: {
        category: category,
        users_id: id,
      },
    })
    .then(([categoryss, created]) => {
      const id = "";
      if (!created) {
        res.status(400).send({
          message: "카테고리 등록하기 : 이미 사용중인 categorys_id 입니다.",
        }); // Server error
        return;
      } else {
        res.status(201).send({ categoryss });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ error, message: "카테고리 등록하기 : Server Error" }); // Server error
    });
};
