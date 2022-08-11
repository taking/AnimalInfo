const PriceModel = require('../models/price.model');
const HistoryModel = require('../models/history.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Price Controller
 ******************************************************************************/
class PriceController {

    getPrice = async (req, res, next) => {
        let priceList = await PriceModel.find();
        if (!priceList.length) {
            throw new HttpException(404, 'Price not found');
        }

        res.send(priceList);
    };

    lastPrice = async (req, res, next) => {
        const price = await PriceModel.last();
        if (!price) {
            throw new HttpException(404, 'History not found');
        }

        res.send(price[0]);
    };

    updatePrice = async (req, res, next) => {
        const result = await PriceModel.update(req.params.price);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }


        // const result2 = await HistoryModel.update("default", req.params.price);

        res.send('Price Changed');
    };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PriceController;