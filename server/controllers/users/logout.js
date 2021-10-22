module.exports = (req, res) => {
  // const refreshToken = req.cookies.refreshToken;

  // if (!refreshToken) {
  //   res.status(401).send({ message: "로그아웃 : 잘못된 요청입니다." });
  //   return;
  // }
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).send({ message: "로그아웃 : 로그인이 만료되었습니다." });
    return;
  }
  try {
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "로그아웃 되었습니다." });
  } catch (error) {
    res.status(500).send({ message: "로그아웃 : Server Error" });
  }
};
