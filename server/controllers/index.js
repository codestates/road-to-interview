module.exports = {
  //users
  login: require("./users/login"),
  auth: require("./users/auth"),
  google: require("./users/google"),
  logout: require("./users/logout"),
  signup: require("./users/signup"),
  usersmodify: require("./users/usersmodify"),
  refreshToken: require("./users/refreshToken"),
  userslikes: require("./users/getlikes"),
  //multer
  photos: require("./functions/multerFunctions/photos"),
  
};
