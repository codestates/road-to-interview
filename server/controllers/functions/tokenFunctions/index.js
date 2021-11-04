require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },

  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      secure: true,
      sameSite: "none",
    });
  },
  sendZeroRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      maxAge: 0,
      secure: true,
      sameSite: "none",
    });
  },
  sendAccessToken: (res, accessToken, userdata) => {
    res.status(200).send({ accessToken, userInfo: userdata });
  },
  resendAccessToken: (res, accessToken, userdata) => {
    res.status(200).json({ accessToken, userInfo: userdata });
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization;

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log("엑세스 토큰 확인 에러");
      return null;
    }
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      console.log("리프레시 토큰 확인 에러");
      return null;
    }
  },
};
