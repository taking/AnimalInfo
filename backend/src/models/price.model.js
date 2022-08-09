const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const Account = require('../utils/userEnable.utils');

class PriceModel {
    tableName = 'PRICE';

    init = async ({ name, price }) => {
        const sql = `INSERT INTO ${this.tableName}
        (price) VALUES (?)`;

        const result = await query(sql, [name, price]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    update = async (name, price) => {
        const sql = `UPDATE ${this.tableName} SET price = ${price} WHERE name = ?`;

        const result = await query(sql, [name]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}

module.exports = new PriceModel;