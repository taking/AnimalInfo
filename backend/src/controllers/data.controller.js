const DataModel = require("../models/data.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
var crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
var fs = require("fs");
const fsp = fs.promises;
const rootPath = process.env.PWD;
const backendDomain = process.env.ADDR;

//날자 Fomat 변경(yyyymmdd)
function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "" + month + "" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function getRandomInt(min, max) {
  //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}

var date = new Date();
date = getFormatDate(date);

// gkes 저장용 폴더 생성
const _file = path.join(rootPath + "/file/");
const _tmp = path.join(rootPath + "/tmp/");
const _gkes = path.join(rootPath + "/gkes/" + date);

// 데이터타입_종_품종_성별_생년월일별_제공처코드_촬영날짜_일련번호_사진부위코드.json
const list = {
  Data: [
    "data_type", // 데이터타입
    "species", // 종
    "race", // 품종
    "birth", // 생년월일
    "sex", // 성별
    "refer", // 제공처코드
    "upload_at", // 촬영날짜
  ],
  File: [
    "01", // 전면
    "02", // 후면
    "03", // 좌측면중앙
    "04", // 좌측면좌45도
    "05", // 좌측면우45도
    "06", // 좌측면상45도
    "07", // 좌측면하45도
    "08", // 우측면중앙
    "09", // 우측면좌45도
    "10", // 우측면우45도
    "11", // 우측면상45도
    "12", // 우측면하45도
    "13", // 상측면
    "14", // 두상전면중앙
    "15", // 두상전면좌45도
    "16", // 두상전면우45도
    "17", // 두상전면상45도
    "18", // 두상전면하45도
    "19", // 두상상측면
    "20", // 비문전면
  ],
};

const copyGkes = (missionId, filePath, fileName, fieldname, ext, req) => {
  // /backend/gkes/ folder check
  try {
    fs.accessSync(_gkes, fs.constants.R_OK | fs.constants.W_OK);
  } catch (error) {
    fs.mkdirSync(_gkes, { recursive: true });
  }

  console.log("gkes missionId : ", missionId);
  console.log("gkes filePath : ", filePath);
  console.log("gkes fileName : ", fileName);
  console.log("gkes  fieldname: ", fieldname);
  console.log("gkes  ext : ", ext);

  let filename = "";

  for (var i = 0; i < list.Data.length; i++) {
    if (req.body[list.Data[i]] != undefined) {
      if (i > 0) {
        filename += "_";
      }
      filename += req.body[list.Data[i]];
    }
  }

  var sourceTxt = fileName;
  var destinationTxt = filename + "_" + missionId + "_" + fieldname + ext;
  // var gkesFile = filename + "_" + missionId + "_" + fieldname +  ".json" ;
  // const content = "";

 // .josn 파일 생성
  // fs.writeFileSync(_gkes + "/" + gkesFile,content);

  copyFile(_file, _gkes, fileName, destinationTxt);

};

async function copyFile(sourceDirPath, destDirPath, sourceName, destinationName) {
  const sourceFilePath = path.join(sourceDirPath, sourceName);
  const destFilePath = path.join(destDirPath, destinationName);
  try {
    await fsp.access(sourceFilePath, fs.constants.R_OK);
    await fsp.access(destDirPath, fs.constants.W_OK);
    await fsp.copyFile(sourceFilePath, destFilePath);

    console.log("File copied successfully.");
  } catch (ex) {
    if (ex.errno === -2) console.error(`File "${sourceFilePath}" doesn't exist.`);
    else if (ex.errno === -13) console.error(`Could not access "${path.resolve(destDirPath)}"`);
    else console.error(`Could not copy "${sourceFilePath}" to "${destDirPath}"`);

    // console.log(ex);
  }
}

/******************************************************************************
 *                              Data Controller
 ******************************************************************************/
class DataController {
  getAllData = async (req, res, next) => {
    let dataList = await DataModel.find();
    if (!dataList.length) {
      throw new HttpException(404, "Data not found");
    }

    res.send(dataList);
  };

  getAllDataSelectDatetime = async (req, res, next) => {
    let dataList = await DataModel.findDatetime({ userId: req.params.id, created_at: req.params.yymm });
    if (!dataList.length) {
      res.send("notfound");
      // throw new HttpException(404, "Data not found");
    }

    res.send(dataList);
  };

  getTotalPrice = async (req, res, next) => {
    let price = await DataModel.findTotalPrice({ userId: req.params.id, created_at: req.params.yymm });
    if (!price) {
      throw new HttpException(404, "Data not found");
    }

    res.send(price);
  };

  getDataById = async (req, res, next) => {
    const data = await DataModel.findById({ userId: req.params.id });
    if (!data) {
      throw new HttpException(404, "User not found");
    }
    res.send(data);
  };

  createData = async (req, res) => {
    // /backend/file/ folder check
    try {
      fs.accessSync(_file, fs.constants.R_OK | fs.constants.W_OK);
    } catch (error) {
      fs.mkdirSync(_file, { recursive: true });
    }

    console.log("rootPath is ", rootPath);
    console.log("_file is ", _file);
    console.log("_tmp is ", _tmp);
    console.log("_gkes is ", _gkes);

    // mission id
    const speciesCnt = await DataModel.getMissionId(req.body.species);

    if (speciesCnt.length !== 0) {
      var cnt = parseInt(speciesCnt[0]["id"]) + 1;
    } else {
      var cnt = 3;
    }

    var cntString = String(cnt);
    var num = cntString.padStart(6, "0");
    var missionId = 0;

    if (req.body.species == "dog" || req.body.species == "10") {
      missionId = "10_" + num;
    } else if (req.body.species == "cat" || req.body.species == "20") {
      missionId = "20_" + num;
    }

    var img = [];
    var img2 = [];

    for (var i = 0; i < list.File.length; i++) {
      const fileListArr = (req.files[list.File[i]] || []).length;
      // console.log("[#1] fileListARr : ", fileListArr);

      const fieldname = list.File[i];

      if (fileListArr == 0) {
        break;
      }

      const field = [];
      var imgLink = "";
      var randNum = getRandomInt(1, 1000000);

      // console.log(list.File[i] + "[" + fileListArr + "]");
      if (fileListArr === undefined) {
        var fileData = req.files[list.File[i]];
        var ext = "";
        var date = new Date().getTime();
        var tmpName = fileData.tempFilePath;
        var md5 = fileData.md5;
        switch (fileData.mimetype) {
          case "image/png":
            ext = ".png";
            break;
          case "image/jpg":
            ext = ".jpg";
            break;
          case "image/jpeg":
            ext = ".jpg";
            break;
        }

        var fileName = md5 + "_" + date + "_" + randNum + ext;

        var destinationTxt = _file + fileName;
        console.log("destinationTxt is ", destinationTxt);

        fs.rename(tmpName, destinationTxt, err => {
          if (err) {
            throw err;
          }
          console.log("sourceFile was copied to destinationFile");
        });
        // copyFile(_tmp, _file, tmpName, _file + fileName);

        // file hash
        const hash = crypto.createHash("md5");
        hash.update("secret" + 0);
        var imgInfo = {
          value: backendDomain + "/file/" + fileName,
          // hash: `${hash.digest('hex')}`
        };
        field.push(imgInfo);

        imgLink += backendDomain + "/file/" + fileName;

        copyGkes(missionId, _file, fileName, fieldname, ext, req);
      }

      var jsonData = {
        name: list.File[i],
        link: imgLink,
      };

      img.push(field);

      if (imgLink === "") {
      } else {
        img2.push(jsonData);
      }
    }

    /////////// multi
    // for (var i = 0; i < list.File.length; i++) {
    //   const fileListArr = (req.files[list.File[i]] || []).length;
    //   // console.log("[#1] fileListARr : ", fileListArr);

    //   const fieldname = list.File[i];

    //   if (fileListArr == 0) {
    //     break;
    //   }

    //   const field = [];
    //   var imgLink = "";
    //   var randNum = getRandomInt(1, 1000000);

    //   // console.log(list.File[i] + "[" + fileListArr + "]");
    //   if (fileListArr === undefined) {
    //     var fileData = req.files[list.File[i]];
    //     var ext = "";
    //     var date = new Date().getTime();
    //     var tmpName = fileData.tempFilePath;
    //     var md5 = fileData.md5;
    //     switch (fileData.mimetype) {
    //       case "image/png":
    //         ext = ".png";
    //         break;
    //       case "image/jpg":
    //         ext = ".jpg";
    //         break;
    //       case "image/jpeg":
    //         ext = ".jpg";
    //         break;
    //     }

    //     var fileName = md5 + "_" + date + "_" + randNum + ext;

    //     var destinationTxt = _file + fileName;
    //     console.log("destinationTxt is ", destinationTxt);

    //     fs.rename(tmpName, destinationTxt, err => {
    //       if (err) {
    //         throw err;
    //       }
    //       console.log("sourceFile was copied to destinationFile");
    //     });
    //     // copyFile(_tmp, _file, tmpName, _file + fileName);

    //     // file hash
    //     const hash = crypto.createHash("md5");
    //     hash.update("secret" + j);
    //     var imgInfo = {
    //       value: backendDomain + "/file/" + fileName,
    //       // hash: `${hash.digest('hex')}`
    //     };
    //     field.push(imgInfo);

    //     imgLink += backendDomain + "/file/" + fileName;

    //     copyGkes(missionId, _file, fileName, fieldname, ext, req, j);
    //   } else {
    //     for (var j = 0; j < fileListArr; j++) {
    //       var fileData = req.files[list.File[i]][j];
    //       console.log("################# : ", fileData);
    //       var ext = "";
    //       var date = new Date().getTime();
    //       var tmpName = fileData.tempFilePath;
    //       var md5 = fileData.md5;
    //       switch (fileData.mimetype) {
    //         case "image/jpg":
    //           ext = ".jpg";
    //           break;
    //         case "image/jpeg":
    //           ext = ".jpg";
    //           break;
    //       }

    //       var fileName = md5 + "_" + date + "_" + randNum + ext;

    //       var destinationTxt = _file + fileName;
    //       console.log("destinationTxt is ", destinationTxt);

    //       fs.rename(tmpName, destinationTxt, err => {
    //         if (err) {
    //           throw err;
    //         }
    //         console.log("sourceFile was copied to destinationFile");
    //       });
    //       // copyFile(_tmp, _file, tmpName, _file + fileName);

    //       // file hash
    //       const hash = crypto.createHash("md5");
    //       hash.update("secret" + j);
    //       var imgInfo = {
    //         value: backendDomain + "/file/" + fileName,
    //         // hash: `${hash.digest('hex')}`
    //       };
    //       field.push(imgInfo);

    //       // image.png,image2.png 합치기
    //       if (j > 0 && j < fileListArr) {
    //         imgLink += ",";
    //       }
    //       imgLink += backendDomain + "/file/" + fileName;

    //       copyGkes(missionId, _file, fileName, fieldname, ext, req, j);
    //     }
    //   }

    //   var jsonData = {
    //     name: list.File[i],
    //     link: imgLink,
    //   };

    //   img.push(field);

    //   if (imgLink === "") {
    //   } else {
    //     img2.push(jsonData);
    //   }
    // }

    // console.log("#### img2 : ", img2);

    const result = await DataModel.create(missionId, req.body, img2);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Data was created!");
  };

  updateData = async (req, res, next) => {
    const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await DataModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "Data not found" : affectedRows && changedRows ? "Data updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  deleteData = async (req, res, next) => {
    const result = await DataModel.delete(req.params.id);

    if (!result) {
      throw new HttpException(404, "Data not found");
    }
    res.send("Data has been deleted");
  };

  checkValidation = req => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DataController();
