const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class HistoryModel {
    tableName = 'HISTORY';

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

        // return back the first row (history)
        return result[0];
    }

    create = async ({ name, dataId, action }) => {
        const sql = `INSERT INTO ${this.tableName}
        (name, dataId, action) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [name, dataId, action]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    
    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new HistoryModel;