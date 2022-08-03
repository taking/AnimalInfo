const HistoryModel = require('../models/history.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              History Controller
 ******************************************************************************/
class HistoryController {
    getAllHistories = async (req, res, next) => {
        let historyList = await HistoryModel.find();
        if (!historyList.length) {
            throw new HttpException(404, 'Histories not found');
        }

        res.send(historyList);
    };

    getHistoryById = async (req, res, next) => {
        const history = await HistoryModel.findOne({ id: req.params.id });
        if (!history) {
            throw new HttpException(404, 'History not found');
        }

        res.send(history);
    };

    getHistoryByName = async (req, res, next) => {
        const history = await HistoryModel.findOne({ name: req.params.name });
        if (!history) {
            throw new HttpException(404, 'History not found');
        }

        res.send(history);
    };

    createHistory = async (req, res, next) => {
        this.checkValidation(req);

        const result = await HistoryModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('History was created!');
    };

    deleteHistory = async (req, res, next) => {
        const result = await HistoryModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'History not found');
        }
        res.send('History has been deleted');
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
module.exports = new HistoryController;