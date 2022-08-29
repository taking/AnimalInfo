const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
const PriceModel = require("./price.model");
class DataModel {
  tableName = "DATA";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async params => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (data)
    return result[0];
  };

  findById = async params => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result;
  };

  findDatetime = async params => {
    var userId = params.userId;
    var yymm = params.created_at;
    const sql = `SELECT * FROM ${this.tableName} WHERE userId = '${userId}' AND DATE(created_at) BETWEEN '${yymm}-01' AND '${yymm}-31'`;

    console.log("sql is : ", sql);

    // const result = await query(sql, [...values]);

    // return back the first row (data)
    const result = await query(sql);

    return result;
  };

  findTotalPrice = async params => {
    var userId = params.userId;
    var yymm = params.created_at;
    const sql = `SELECT * FROM ${this.tableName} WHERE userId = '${userId}' AND DATE(created_at) BETWEEN '${yymm}-01' AND '${yymm}-31'`;

    const result = await query(sql);

    var sum = 0;
    var cnt = 0;

    const lengthCheck = (result || []).length;
    console.log("lengthCheck is : ", lengthCheck);

    if (lengthCheck >= 0) {
      for (var i = 0; i < lengthCheck; i++) {
        console.log("i : ", i);
        console.log("result[i].price is : ", parseInt(result[i].price));
        if (result[i].price != null) {
          sum += parseInt(result[i].price);
          cnt++;
        }
      }
    }

    var returnVal = {
      count: cnt,
      totalPrice: sum,
    };

    var jsonData = JSON.stringify(returnVal);

    return jsonData;
  };

  create = async (missionId, params, img) => {

    const sql = `INSERT INTO ${this.tableName}
        (id, userId, refer, price, data_type, species, race, birth, sex, weight, shoulderHeight, neckSize, backLength, chestSize, BCS, 
        exercise, foodCount, environment, defecation, foodAmount, snackAmount, foodKind, disease, diseaseName, CPR, lgG, IL6, AFP, 
        heartRate, breatingRate, bodyHeat, stress, a01, a02, a03, a04, a05, a06, 
        a07, a08, a09, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19 ,a20) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const getPrice = await PriceModel.last();
    const price = getPrice[0]["price"];

    
    const result = await query(sql, [
      missionId,
      params.userId,
      params.refer,
      price,
      params.data_type,
      params.species,
      params.race,
      params.birth,
      params.sex,
      params.weight,
      params.shoulderHeight,
      params.neckSize,
      params.backLength,
      params.chestSize,
      params.BCS,
      params.exercise,
      params.foodCount,
      params.environment,
      params.defecation,
      params.foodAmount,
      params.snackAmount,
      params.foodKind,
      params.disease,
      params.diseaseName,
      params.CPR,
      params.lgG,
      params.IL6,
      params.AFP,
      params.heartRate,
      params.breatingRate,
      params.bodyHeat,
      params.stress,
      img[0].link,
      img[1].link,
      img[2].link,
      img[3].link,
      img[4].link,
      img[5].link,
      img[6].link,
      img[7].link,
      img[8].link,
      img[9].link,
      img[10].link,
      img[11].link,
      img[12].link,
      img[13].link,
      img[14].link,
      img[15].link,
      img[16].link,
      img[17].link,
      img[18].link,
      img[19].link,
    ]);

    

    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);
    console.log("##########", result);
    return result;
  };

  delete = async id => {
    console.log("id : ", id);
    // const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const sql = `DELETE FROM ${this.tableName} WHERE id in (${id})`;
    // const result = await query(sql, [id]);
    const result = await query(sql);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  getMissionId = async species => {
    // const sql = `SELECT COUNT(*)  AS count FROM ${this.tableName} WHERE species =? `
    const sql = ` SELECT SUBSTRING_INDEX(id,'_',-1) AS id FROM ${this.tableName} where species =? ORDER BY id DESC LIMIT 1`;
    const result = await query(sql, [species]);

    return result;
  };

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

module.exports = new DataModel();
