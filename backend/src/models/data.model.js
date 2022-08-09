const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class DataModel {
    tableName = 'DATA';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (data)
        return result[0];
    }

    //  create = async (missionId,{refer, data_type, species, dogRace, catRace, birth, sex, weight, shoulderHeight, neckSize, backLength, chestSize, BCS, 
    //     exercise, foodCount, environment, defecation, foodAmount, snackAmount, foodKind, disease, diseaseName, CPR, lgG, IL6, AFP, 
    //     heartRate, breatingRate, bodyHeat, stress},imgName) => {

    //      (id,userId,refer, data_type, species, dogRace, catRace, birth, sex, weight, shoulderHeight, neckSize, backLength, chestSize, BCS, 
    //     exercise, foodCount, environment, defecation, foodAmount, snackAmount, foodKind, disease, diseaseName, CPR, lgG, IL6, AFP, 
    //     heartRate, breatingRate, bodyHeat, stress, imgAllFront, imgAllTop, imgAllLeft, imgAllRight, imgAllBack, imgHeadFront, imgHeadTop, 
    //     imgHeadLeft, imgHeadRight, imgHeadBottom, imgNoseFront ) 
    //      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        //  const result = await query(sql, 
        //     [id,userId,refer, data_type, species, dogRace, catRace, birth, sex, weight, shoulderHeight, neckSize, backLength, chestSize, BCS, 
        //     exercise, foodCount, environment, defecation, foodAmount, snackAmount, foodKind, disease, diseaseName, CPR, lgG, IL6, AFP, 
        //     heartRate, breatingRate, bodyHeat, stress,imgName[0].join(),imgName[1].join(),imgName[3].join(),imgName[4].join(),imgName[5].join(),
        //     imgName[6].join(),imgName[7].join(),imgName[8].join(),imgName[9].join(),imgName[10].join(),imgName[11].join()]);


    create = async (missionId, params, img) => {

        console.log(missionId)
        console.log(params)
        const sql = `INSERT INTO ${this.tableName}
        (id, userId, refer, data_type, species, race, birth, sex, weight, shoulderHeight, neckSize, backLength, chestSize, BCS, 
        exercise, foodCount, environment, defecation, foodAmount, snackAmount, foodKind, disease, diseaseName, CPR, lgG, IL6, AFP, 
        heartRate, breatingRate, bodyHeat, stress, imgAllFront, imgAllTop, imgAllLeft, imgAllRight, imgAllBack, imgHeadFront, imgHeadTop, 
        imgHeadLeft, imgHeadRight, imgHeadBottom, imgNoseFront) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;


        const result = await query(sql, [missionId, params.userId, params.refer, params.data_type, params.species,params.race, params.birth, params.sex, params.weight, params.shoulderHeight, params.neckSize, params.backLength, params.chestSize, params.BCS, 
            params.exercise, params.foodCount, params.environment, params.defecation, params.foodAmount, params.snackAmount, params.foodKind, params.disease, params.diseaseName, params.CPR, params.lgG, params.IL6, params.AFP, 
            params.heartRate, params.breatingRate, params.bodyHeat, params.stress,
            img[0].link, img[1].link, img[2].link, img[3].link, img[4].link, img[5].link, img[6].link, img[7].link, img[8].link,img[9].link,img[10].link]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
     }

    update = async (params, id) => {
        
        const { columnSet, values } = multipleColumnSet(params)
        console.log(columnSet)
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    getMissionId = async (species) =>{
        const sql = `SELECT COUNT(*)  AS count FROM ${this.tableName} WHERE species =? `
        const result = await query(sql,[species]);

        return result;
    }

    // fileUpload = async (req,res,next) => {
    //     var multer = require('multer');

    //     const storage = multer.diskStorage({
    //         destination: function (req, file, cb) {
    //         cb(null, '/animal/animalinfo-develop/backend-renew/src/file')
    //         },
    //         filename(req, file, cb) { // 파일명을 어떤 이름으로 올릴지
    //             cb( null, `${req.body.data_type}_${req.body.species}_${file.originalname}` );
    //     }
    //     });
        
    //    upload =  multer({ storage: storage }).fields([
    //         // { name : "imgAllFront"},
    //         // { name : "imgAllTop"},
    //         // { name : "imgAllLeft"},
    //         // { name : "imgAllRight"},
    //         // { name : "imgAllBack"},
    //         // { name : "imgHeadFront"},
    //         // { name : "imgHeadTop"},
    //         // { name : "imgHeadLeft"},
    //         // { name : "imgHeadRight"},
    //         { name : "imgHeadBottom"},
    //         { name : "imgNoseFront"},
    //     ]);

    //     return upload;
    // }
}

module.exports = new DataModel;