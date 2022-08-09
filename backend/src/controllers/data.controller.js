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


//날자 Fomat 변경(yyyymmdd)
function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}


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

const copyGkes = (missionId, filePath, fileName, fieldname, ext, req, cnt) => {

    console.log("gkes missionId : ",missionId)
    console.log("gkes filePath : ",filePath)
    console.log("gkes fileName : ",fileName)
    console.log("gkes  fieldname: ",fieldname)
    console.log("gkes  ext : ",ext)
    
    var date = new Date();
    date = getFormatDate(date);

    // gkes 저장용 폴더 생성
    const _gkes = path.join(rootPath + '/gkes/' + date)
    try {
      fs.accessSync(_gkes);
    } catch (error) {
      fs.mkdirSync(_gkes, { recursive: true });
    }

    let filename = "";
    

        for (var i = 0; i < list.Data.length; i++) {
            if (req.body[list.Data[i]] != undefined) {
            if (i>0) {
                filename += "_";
            }
            filename += req.body[list.Data[i]];
            
            }
    }

    gekesName = filename + "_" + fieldname + "_" + missionId + "_" + cnt + ext ;


    console.log(gekesName)

    var sourceTxt = filePath  + fileName;
            // switch(fieldname) {
            //     case: "imgAllFront" {
            //         var fieldnameTxt = "_" + "10";
            //     }
            // }
            // var destinationTxt = _gkes + "/" + filename + extentionTxt;
    var destinationTxt = _gkes + "/" + filename + gekesName;


    console.log("source path : ", sourceTxt);
    console.log("destination path : ", destinationTxt);

    fs.copyFile(sourceTxt, destinationTxt, (err) => {
        if (err) throw err;
        console.log('sourceFile was copied to destinationFile');
    });
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
        const _file = path.join(rootPath + '/file/')
        // gkes 저장용 폴더 생성
        try {
          fs.accessSync(_file);
        } catch (error) {
          fs.mkdirSync(_file);
        }


       // mission id
       const speciesCnt = await DataModel.getMissionId(req.body.species);
     
       if (speciesCnt.length !==0){
        var cnt = parseInt(speciesCnt[0]['id']) +1;
       }else{
        var cnt = 3;
       }
    
       var cntString = String(cnt);
       var num = cntString.padStart(6,'0');
       var missionId = 0;

       if(req.body.species == "dog" || req.body.species == "10"){
            missionId = '10_' + num; 
       }else if(req.body.species == "cat" || req.body.species == "20"){
            missionId = '20_' + num; 
       }

        
        var img = [];
        var img2 = [];

        // console.log("------data------", req.body)
        // console.log("------req.files------", req.files[list.File[0]])

        for (var i = 0; i < list.File.length; i++) {
            const fileListArr = (req.files[list.File[i]] || []).length;
            // console.log("[#1] fileListARr : ", fileListArr);

            const fieldname = list.File[i];

            if (fileListArr == 0) {
                break;
            }
            
            const field = [];
            var imgLink = "";

            // console.log(list.File[i] + "[" + fileListArr + "]");
            if (fileListArr === undefined) {
                    const _file = path.join(rootPath + '/file/');
                    var fileData = req.files[list.File[i]];
                    var ext = "";
                    var date = new Date().getTime();
                    var md5 = fileData.md5;
                    switch(fileData.mimetype) {
                        case 'image/png':
                            ext = ".png";
                            break;
                        case 'image/jpg':
                            ext = ".jpg";
                            break;
                        case 'image/jpeg':
                            ext = ".jpeg";
                            break;
                    }
    
                    var fileName = md5 + "_" + date + ext;
    
                    fileData.mv(_file + fileName, function(err) {
                            if (err)
                                console.log("file mv error.")
                                return res.status(500).send(err);
                        });
    
                    copyGkes(missionId, _file, fileName,fieldname,ext, req,0);
                    // file hash
                    const hash = crypto.createHash('md5'); 
                    hash.update('secret' + j);
                    var imgInfo = {
                        value: backendDomain + '/file/' + fileName,
                        // hash: `${hash.digest('hex')}`
                    }
                    field.push(imgInfo);
    
                    imgLink += backendDomain + '/file/' + fileName;

            } else { 
                for (var j = 0; j < fileListArr; j++) {
                    const _file = path.join(rootPath + '/file/');
                    var fileData = req.files[list.File[i]][j];
                    console.log("################# : ", fileData);
                    var ext = "";
                    var date = new Date().getTime();
                    var md5 = fileData.md5;
                    switch(fileData.mimetype) {
                        case 'image/png':
                            ext = ".png";
                            break;
                        case 'image/jpg':
                            ext = ".jpg";
                            break;
                        case 'image/jpeg':
                            ext = ".jpeg";
                            break;
                    }
    
                    console.log("file name is : ", fileData.name);
                    console.log("file Extenstion is : ", ext);
                    console.log("file md5 is : ", md5);
    
                    var fileName = md5 + "_" + date + ext;
                   
    
                    fileData.mv(_file + fileName, function(err) {
                        if (err)
                            console.log("file mv error.")
                            return res.status(500).send(err);
                    });

                    copyGkes(missionId, _file, fileName,fieldname,ext, req,j);
    
                    // file hash
                    const hash = crypto.createHash('md5'); 
                    hash.update('secret' + j);
                    var imgInfo = {
                        value: backendDomain + '/file/' + fileName,
                        // hash: `${hash.digest('hex')}`
                    }
                    field.push(imgInfo);
    
                    // image.png,image2.png 합치기
                    if (j > 0 && j < fileListArr) {
                        imgLink += ","
                    }
                    imgLink += backendDomain + '/file/' + fileName;
                }
            }
            

            var jsonData = {
                "name" : list.File[i],
                "link" : imgLink,
            }

            img.push(field);

            if (imgLink === '') {                
            } else {
                img2.push(jsonData);
            }
        }

        // console.log("#### img2 : ", img2);

       const result = await DataModel.create(missionId, req.body, img2);
        
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Data was created!');
    };

    updateData = async (req, res, next) => {

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