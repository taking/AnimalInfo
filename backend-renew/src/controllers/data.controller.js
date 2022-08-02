const DataModel = require('../models/data.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Data Controller
 ******************************************************************************/
class DataController {
    getAllData = async (req, res, next) => {
        let dataList = await DataModel.find();
        if (!dataList.length) {
            throw new HttpException(404, 'Data not found');
        }

        res.send(dataList);
    };

    getDataById = async (req, res, next) => {
        const data = await DataModel.findOne({ id: req.params.id });
        if (!data) {
            throw new HttpException(404, 'Data not found');
        }

        res.send(data);
    };

    getDataByRefer = async (req, res, next) => {
        const data = await DataModel.findOne({ refer: req.params.refer });
        if (!data) {
            throw new HttpException(404, 'Data not found');
        }

        res.send(data);
    };

    createData = async (req, res, next) => {
        this.checkValidation(req);

        const result = await DataModel.create(req.body);

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