const { users } = require("../../models");

module.exports = (req, res) => {
  const token = req.query.token;
  if (token !== "wiiigglewiiiggle") {
    res.status(400).send({ message: "잘못된 요청입니다." });
    return;
  }
  const email = req.query.email;
  users
    .update(
      {
        emailauth: "yes",
      },
      {
        where: { email },
      }
    )
    .then((result) => {
      res.redirect(
        "http://wiiiggle-test.s3-website.ap-northeast-2.amazonaws.com/"
      ); //메인페이지로
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "이메일 인증 Server Error" }); // Server error
    });
};
