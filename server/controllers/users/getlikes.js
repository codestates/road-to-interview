const { sequelize } = require("../../models");
const { isAuthorized } = require("../functions/tokenFunctions");
module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res
      .status(401)
      .send({ message: " users 좋아요 찾기 : 유효하지 않은 접근입니다." });
    return;
  }
  const { id } = accessTokenData;
  sequelize
    .query(
      `select p.id,r.name,p.tmi,p.menu,p.score, ph.src,r.latitude, r.longitude, r.address
		from posts p 
		left outer join photos ph
		on p.id = ph.posts_id
        join restaurants r
        on r.id = p.restaurants_id
        where p.id in (select up.postid from users u join users_posts up on u.id = up.userid where u.id = ` +
        id +
        `)
		group by p.id;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).send({ posts: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "좋아요 등록 에러 Server Error" }); // Server error
    });
};
