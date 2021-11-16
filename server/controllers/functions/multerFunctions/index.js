const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.region = process.env.AWS_CONFIG_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_CONFIG_IDENTITYPOOLID,
});

const s3 = new AWS.S3();
// console.log(s3);
const filename = Math.random();
const storage = multerS3({
  s3: s3,
  bucket: "wiiigglelunch",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now()}_${filename.toString()}`);
  },
});

module.exports.upload = multer({ storage: storage });
