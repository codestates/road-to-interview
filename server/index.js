require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { upload } = require("./controllers/functions/multerFunctions");
const controllers = require("./controllers");
const models = require("./models/index");
let server;
const { Server } = require("socket.io");
const cron = require("node-cron");
const { insertNews } = require(__dirname + "/crawl");

const { insertRankings } = require("./controllers/functions/rangkingFunctions");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

// sequelize models 폴더와 동기화
// models.sequelize
//   .sync()
//   .then(() => {
//     console.log("DB 연결성공");
//   })
//   .catch((err) => {
//     console.log("DB 연결실패");
//     console.log(err);
//   });
//multer-s3 사진 업로드
// app.post("/photos", upload.array("image"), controllers.photos);

//users
app.post("/login", controllers.login);
app.get("/auth", controllers.auth);
app.post("/oauth", controllers.oAuth);
app.get("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.put("/users", controllers.usersmodify);
app.get("/users", controllers.refreshToken);
app.post("/likes/:id", controllers.likes);

//interviews
app.get("/interviews", controllers.getInterviews);
app.post("/interviews", controllers.createInterviews);
//answers
app.get("/answers", controllers.getMyAnswers);
app.get("/answers/:id", controllers.getAnswersById);
app.post("/answers", controllers.createAnswers);
//questions
app.get("/questions/:id", controllers.getQuestions);
//collection
app.post("/collections/:id", controllers.createCollections);
app.delete("/collections/:id", controllers.deleteCollections);
app.get("/collections", controllers.getCollections);
//categorys
app.post("/categorys", controllers.createCategory);
app.get("/categorys", controllers.getCategorys);
//news
app.get("/news", controllers.getNews);
const HTTPS_PORT = process.env.HTTPS_PORT || 8080;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);

  server.listen(HTTPS_PORT, () => console.log("server runnning"));
} else {
  server = app.listen(HTTPS_PORT);
  //node cron 서비스 예약 실행
  cron.schedule("00 00 * * *", () => {
    console.log("00 들어옴");
    insertNews();
  });
  cron.schedule("30 00 00 * * *", () => {
    console.log("30 00 들어옴");
    insertNews();
  });
  cron.schedule("01 00 * * *", () => {
    console.log("01 들어옴");
    insertNews();
  });

  //socket io
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    // join : 채팅 참여 이벤트
    socket.on("join", ({ email, nickName }) => {
      socket.join(email);
      io.to(email).emit("onConnect", `${nickName} 님이 입장했습니다.`);
      // send : 클라이언트가 메시지 보내는 이벤트
      // item: {name: String, msg: String, timeStamp: String}
      socket.on("onSend", (messageItem) => {
        io.to(email).emit("onReceive", messageItem);
        console.log(email, messageItem, nickName);
      });

      socket.on("disconnect", () => {
        socket.leave(email);
        io.to(email).emit("onDisconnect", `${nickName} 님이 퇴장하셨습니다.`);
        console.log(email, `${nickName} 님이 퇴장하셨습니다.`);
      });
    });
  });
}
module.exports = server;
