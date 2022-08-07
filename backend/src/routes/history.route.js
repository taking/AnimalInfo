const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createHistorySchema } = require('../middleware/validators/historyValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(historyController.getAllHistories)); // localhost:3000/api/v1/history
router.post('/', createHistorySchema, awaitHandlerFactory(historyController.createHistory)); // localhost:3000/api/v1/history
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(historyController.deleteHistory)); // localhost:3000/api/v1/history/id/1
router.get('/name/:name', auth(), awaitHandlerFactory(historyController.getHistoryByName)); // localhost:3000/api/v1/history/name/consine2c

module.exports = router;