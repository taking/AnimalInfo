const DataModel = require('../models/data.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
var crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');
var fs = require('fs');
dotenv.config();
const rootPath = process.env.PWD;
const backendDomain = process.env.ADDR;

// 데이터타입_종_품종_성별_생년월일별_제공처코드_촬영날짜_일련번호_사진부위코드.json
const list = {
    Data : [
        "data_type",  // 데이터타입
        "species",    // 종
        "dogRace",    // 품종
        "catRace",    // 품종
        "sex",        // 성별
        "birth",      // 생년월일
        "refer",      // 제공처코드
        "upload_at",  // 촬영날짜

    ],
    File: [
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
        "imgNoseFront",
    ]
}


const copyGkes = (missionId, req) => {
    console.log("copyGkes body is : ", req.body);
    console.log("copyGkes files is : ", req.files);
    console.log("missionId",missionId)

    var filename = "";


    for (var i = 0; i < list.Data.length; i++) {
        if (req.body[list.Data[i]] != undefined) {
          if (i>0) {
            filename += "_";
          }
          filename += req.body[list.Data[i]];
        }
  }
//   filename += "_"+missionId;


  console.log("### filename. : ", filename);
    const _file = path.join(rootPath + '/file')
    // gkes 저장용 폴더 생성
    const _gkes = path.join(rootPath + '/gkes')
    try {
      fs.accessSync(_gkes);
    } catch (error) {
      fs.mkdirSync(_gkes);
    }

    // for (var i = 0; i < 3; i++) {
        for (var i = 0; i < list.File.length; i++) {
        const fileListArr = (req.files[list.File[i]] || []).length;
        var _source = [];
        var _destination = _gkes;

        if (fileListArr == 0) {
            break;
        }

        for (var j = 0; j < fileListArr; j++) {
            var fieldname = missionId + "_" + req.files[list.File[i]][j].fieldname + "_" + j;
            var fileNameTxt = req.files[list.File[i]][j].filename;
            var extentionTxt = "." + req.files[list.File[i]][j].filename.split('.').pop();
            var sourceTxt = _file + "/" + fileNameTxt;

            // switch(fieldname) {
            //     case: "imgAllFront" {
            //         var fieldnameTxt = "_" + "10";
            //     }
            // }
            var fieldnameTxt = "_" + fieldname;
            // var destinationTxt = _gkes + "/" + filename + extentionTxt;
            var destinationTxt = _gkes + "/" + filename + fieldnameTxt + extentionTxt;
  

            console.log("file extention : ", extentionTxt);
            console.log("source path : ", sourceTxt);
            console.log("destination path : ", destinationTxt);

            fs.copyFile(sourceTxt, destinationTxt, (err) => {
                if (err) throw err;
                console.log('sourceFile was copied to destinationFile');
            });
        }
    }
}


/******************************************************************************
 *                              Data Controller
 ******************************************************************************/
class DataController { 

    getAllData = async (req,res,next) => {
        let dataList = await DataModel.find();
        if (!dataList.length) {
            throw new HttpException(404, 'Data not found');
        }
        res.send(dataList);
    };

    getDataById = async (req, res, next) => {
        const data = await DataModel.findOne({ id: req.params.id });
        if (!data) {
            throw new HttpException(404, 'User not found');
        }
        res.send(data);
    };

    createData = async (req, res) => {
        
        var img = [];
        var img2 = [];

        console.log("------data------",req.body)

        for (var i = 0; i < list.File.length; i++) {
            const fileListArr = (req.files[list.File[i]] || []).length;
            if (fileListArr == 0) {
                break;
            }

            const field = [];
            var imgLink = "";
            // console.log(list.File[i] + "[" + fileListArr + "]");
            for (var j = 0; j < fileListArr; j++) {
                // console.log("field is : ", field);
                // console.log(" - value###### is :", req.files[list.File[i]][j].filename);

                // file hash
                const hash = crypto.createHash('md5'); 
                hash.update('secret' + j);
                var imgInfo = {
                    value: backendDomain + '/file/' + req.files[list.File[i]][j].filename,
                    // hash: `${hash.digest('hex')}`
                }
                field.push(imgInfo);

                // image.png,image2.png 합치기
                if (j > 0 && j < fileListArr) {
                    imgLink += ","
                }
                imgLink += backendDomain + '/file/' + req.files[list.File[i]][j].filename;
            }

            var jsonData = {
                "name" : list.File[i],
                "link" : imgLink,
            }

            img.push(field);
            img2.push(jsonData);
        }

       // mission id
       const speciesCnt = await DataModel.getMissionId(req.body.species);
       var cnt = speciesCnt[0]['count'] +1;
       var cntString = String(cnt);
       var num= cntString.padStart(6,'0');
       let missionId =0;

       if(req.body.species == "dog"){
            missionId = '10_' + num; 
       }else if(req.body.species == "cat"){
            missionId = '20_' + num; 
       }


       const result = await DataModel.create(missionId, req.body, img2);
        
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        copyGkes(missionId, req);
        res.status(201).send('Data was created!');
    };

    updateData = async (req, res, next) => {
        console.log("req.field~~~~~~~~~~", req.field)
        console.log("req.fields~~~~~~~~~~", req.fields)
        console.log("req.body~~~~~~~~~~", req.body)
        console.log("update id~~~~~~~~~~", req.params.id)

        const { ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await DataModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Data not found' :
            affectedRows && changedRows ? 'Data updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteData = async (req, res, next) => {
        const result = await DataModel.delete(req.params.id);
    
        if (!result) {
            throw new HttpException(404, 'Data not found');
        }
        res.send('Data has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DataController;