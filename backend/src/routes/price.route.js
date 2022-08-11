const express = require('express');
const router = express.Router();
const priceController = require('../controllers/price.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', auth(Role.Admin), awaitHandlerFactory(priceController.getPrice)); // localhost:3000/api/v1/price
router.get('/last', auth(Role.Admin), awaitHandlerFactory(priceController.lastPrice)); // localhost:3000/api/v1/price
router.post('/:price', auth(Role.Admin), awaitHandlerFactory(priceController.updatePrice)); // localhost:3000/api/v1/price/3000

module.exports = router;