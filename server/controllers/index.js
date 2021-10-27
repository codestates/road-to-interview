module.exports = {
  //users
  login: require("./users/login"),
  auth: require("./users/auth"),
  google: require("./users/google"),
  logout: require("./users/logout"),
  signup: require("./users/signup"),
  usersmodify: require("./users/usersmodify"),
  refreshToken: require("./users/refreshToken"),
  likes: require("./users/likes"),
  //interviews
  getInterviews: require("./interviews/getInterviews"),
  //answers
  getMyAnswers: require("./answers/getMyAnswers"),
  getAnswersById: require("./answers/getAnswersById"),
  //multer
  photos: require("./functions/multerFunctions/photos"),
};
