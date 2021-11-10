const { sequelize } = require("../../models");
module.exports = (req, res) => {
  sequelize
    .query(
      `select a.position, a.company,a.url,a.img
      from (select position, company, url,img, date(createdAt) created from news) a
      where created = ?`,
      {
        replacements: [
          new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0],
        ],
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((news) => {
      if (!news) {
        res
          .status(400)
          .send({ message: "뉴스 불러오기 : 데이터를 찾을 수 없습니다." });
      } else {
        res.status(200).send({ news });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ error, message: "뉴스 불러오기 Server Error" }); // Server error
    });
};
