module.exports = {
  //users
  login: require("./users/login"),
  auth: require("./users/auth"),
  oAuth: require("./users/oAuth"),
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
  //questions
  getQuestions: require("./questions/getQuestions"),
  //multer
  photos: require("./functions/multerFunctions/photos"),
};
