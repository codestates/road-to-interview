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
  createInterviews: require("./interviews/createInterviews"),
  //answers
  getMyAnswers: require("./answers/getMyAnswers"),
  getAnswersById: require("./answers/getAnswersById"),
  createAnswers: require("./answers/createAnswers"),
  //questions
  getQuestions: require("./questions/getQuestions"),
  //collections
  createCollections: require("./collections/createCollections"),
  getCollections: require("./collections/getCollections"),
  deleteCollections: require("./collections/deleteCollections"),
  //categorys
  createCategory: require("./categorys/createCategory"),
  getCategorys: require("./categorys/getCategorys"),
  //news
  getNews: require("./news/getNews"),
  //multer
  photos: require("./functions/multerFunctions/photos"),
};
