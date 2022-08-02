const PriceModel = require('../models/price.model');
const HistoryModel = require('../models/history.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Price Controller
 ******************************************************************************/
class PriceController {

    initPrice = async (req, res, next) => {

        const jsonData = {
            "name": "default",
            "price": 0
        }

        const result = await PriceModel.init(jsonData);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('init Price was created!');
    };

    getPrice = async (req, res, next) => {
        let priceList = await PriceModel.find();
        if (!priceList.length) {
            throw new HttpException(404, 'Price not found');
        }

        res.send(priceList);
    };

    updatePrice = async (req, res, next) => {
        const result = await PriceModel.update("default", req.params.price);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }


        const result2 = await HistoryModel.update("default", req.params.price);

        res.send('Price Changed');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PriceController;