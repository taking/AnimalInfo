const path = require('path');
var multer = require('multer');
var fs = require('fs');
const DataModel = require('../models/data.model');
const dotenv = require('dotenv');
const dataController = require('../controllers/data.controller');
dotenv.config();
const rootPath = process.env.PWD;

// 데이터타입_종_품종_생년월일_성별_제공처코드_촬영날짜_일련번호_사진부위코드.json
const listUp = {
  data : [
    "data_type",  // 데이터타입
    "species",    // 종
    "dogRace",    // 품종
    "catRace",    // 품종
    "birth",      // 생년월일
    "sex",        // 성별
    "refer",      // 제공처코드
  ],
  file : [
    "imgAllFront",
    "imgAllTop",
    "imgAllLeft",
    "imgAllRight",
    "imgAllBack",
    "imgHeadFront",
    "imgHeadTop",
    "imgHeadLeft",
    "imgHeadRight",
    "imgHeadBottom",
    "imgNoseFront"
  ]
}

// const dir = path.join(__dirname,'../../file')
const dir = path.join(rootPath + '/file')
try {
  fs.accessSync(dir);
} catch (error) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir)
    },
    async filename(req, file, cb) { // 파일명을 어떤 이름으로 올릴지
      var filename = "";
  //     console.log("req body : ", req.body);
  //     console.log("req files: ",req.files)

  //     // for (let i = 0; i < listUp.data.length; i++) {
  //     //   if (req.body[listUp.data[i]] != undefined) {
  //     //     if (i>0) {
  //     //       filename += "_";
  //     //     }
  //     //     filename += req.body[listUp.data[i]];
  //     //   }
  //     // }


  //     for (var key in req.body) {
  //       filename += req.body[key] + "_";
  //     }

  //     // console.log("~~~~~~~~~~~~~",req.files[listUp.file[0]][0].fieldname)

  //     // for(var i=0; i<3; i++){
  //     //   filename += req.files[listUp.file[0]][0].fieldname
  //     //   }
      
  //     // cb( null, `${req.body.data_type}_${req.body.species}_${file.originalname}` );
  //     // console.log("file", file);
  //     // cb( null, filename + `_${file.originalname}` );

    const ext = path.extname(file.originalname);

  //   // const basename = path.basename(file.originalname, ext);
  //   // filename +=file.fieldname + ext;
    filename += new Date().getTime()+ ext;
    cb(null, filename);
  } 
  });
  

const limits = { fileSize: 20 * 1024 * 1024 };
// upload = multer({ storage: storage }).array('imgNoseFront');

upload = multer({ storage, limits })
  .fields([
    { name : "imgAllFront"},
    { name : "imgAllTop"},
    { name : "imgAllLeft"},
    { name : "imgAllRight"},
    { name : "imgAllBack"},
    { name : "imgHeadFront"},
    { name : "imgHeadTop"},
    { name : "imgHeadLeft"},
    { name : "imgHeadRight"},
    { name : "imgHeadBottom"},
    { name : "imgNoseFront"},
])


module.exports = upload;

