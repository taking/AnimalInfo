const DataModel = require('../models/data.model');
const HttpException = require('../utils/HttpException.utils');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { fileUpload } = require('../models/data.model');
dotenv.config();
// route.use(bodyParser.urlencoded({ extended: false }))
// router.use(express.urlencoded({extended : false}));
// // parse application/json
// router.use(bodyParser.json())


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
        console.log("data : ", req.body);
        console.log("files : ", req.files);
        console.log("file : ", req.file);
        // this.checkValidation(req)
        // var array = ['imgAllFront','imgAllTop','imgAllLeft','imgAllRight','imgAllBack'
        // ,'imgHeadFront','imgHeadTop','imgHeadLeft','imgHeadRight','imgHeadBottom','imgNoseFront'];
        
    //     var array = ['imgHeadBottom','imgNoseFront'];
        
        
        var img = [];
        
        for(var i=0; i<array.length; i++){
            const field = [];
            for(var j=0; j<req.files[`${array[i]}`].length; j++){
                // file hash
                const hash = crypto.createHash('sha256'); 
                hash.update('secret' + j);
                var imgInfo = {
                    name: req.files[`${array[i]}`][j].filename,
                    hash: `${hash.digest('hex')}`
                }              
                field.push(imgInfo)    
            }
            img.push(field)
        }
        

        var imglist = [];
        var imgName = [];
        for (var i=0; i<array.length; i++){
            var url = [];
            // imgName[i] = 'http://192.168.160.237:8888/file/' + img[i].map((x) => x.name);
            imglist[i] = img[i].map((x) => x.name);
            for(var j=0; j<imglist[i].length; j++){
                
                url[j] =  'http://192.168.160.237:8888/file/' + imglist[i][j];
            }
            imgName.push(url);
        }

        console.log(imgName)
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

       const result = await DataModel.create(missionId,req.body,imgName);
        
    //     if (!result) {
    //         throw new HttpException(500, 'Something went wrong');
    //     }
    //     res.status(201).send('Data was created!');
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