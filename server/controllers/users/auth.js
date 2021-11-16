const { users } = require("../../models");

module.exports = (req, res) => {
  const { email, token } = req.query;
  users
    .findOne({
      where: { email },
    })
    .then((email_creat) => {
      if (!email_creat) {
        res
          .status(400)
          .send({ message: "이메일 인증 : 사용자를 찾을 수 없습니다." }); // Server error
      } else {
        if (token === email_creat.dataValues.salt) {
          users
            .update(
              {
                emailauth: true,
              },
              {
                where: { email },
              }
            )
            .then((result) => {
              res.redirect("https://roadtointerview.site/"); //메인페이지로
            })
            .catch((error) => {
              console.log(error);
              res
                .status(500)
                .send({ message: "이메일 인증 : 사용자 검색 Server Error" }); // Server error
            });
        } else {
          res.status(400).send({ message: "이메일 인증 : 잘못된 요청입니다." });
          return;
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "이메일 인증 :  Server Error" }); // Server error
    });
};
