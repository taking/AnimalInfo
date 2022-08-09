const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const Account = require('../utils/userEnable.utils');

class PriceModel {
    tableName = 'PRICE';
    
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }


    last = async (params = {}) => {
        let sql = `SELECT price FROM ${this.tableName} ORDER BY id DESC LIMIT 1`;

        return await query(sql, []);
    }    

    update = async (price) => {
        const sql = `INSERT INTO ${this.tableName}
        (price) VALUES (?)`;

        const result = await query(sql, [price]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new PriceModel;