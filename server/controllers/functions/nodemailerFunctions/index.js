require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  mailSend: (email, salt) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_ID, // gmail 계정 아이디를 입력
        pass: process.env.GOOGLE_PASSWORD, // gmail 계정의 비밀번호를 입력
      },
    });

    let mailOptions = {
      from: process.env.GOOGLE_ID + "@gmail.com", // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: email, // 수신 메일 주소
      subject: "Road To Interview 회원가입 인증", // 제목
      html:
        "<p>아래의 링크를 클릭해주세요 !</p>" +
        "<a href='https://sjitygfree.ga/auth?email=" +
        email +
        "&token=" +
        salt +
        "'>Email 인증하기</a>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
