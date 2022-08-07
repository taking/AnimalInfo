const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../utils/upload.utils');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createDataSchema, updateDataSchema } = require('../middleware/validators/dataValidator.middleware');



router.get('/', auth(),awaitHandlerFactory(dataController.getAllData)); // localhost:3000/api/v1/data
router.get('/id/:id', auth(), awaitHandlerFactory(dataController.getDataById)); // localhost:3000/api/v1/data/id/1
router.post('/',auth(),createDataSchema, upload, awaitHandlerFactory(dataController.createData)); // localhost:3000/api/v1/data
router.patch('/id/:id', auth(Role.Admin), updateDataSchema, awaitHandlerFactory(dataController.updateData)); // localhost:3000/api/v1/data/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(dataController.deleteData)); // localhost:3000/api/v1/data/id/1

module.exports = router;