const express = require("express");
const router = express.Router();
const dataController = require("../controllers/data.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

const path = require("path");
const fileUpload = require("express-fileupload");
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    // dir for windows PC
    tempFileDir: path.join(__dirname, "../../tmp"),
    safeFileNames: true,
    preserveExtension: true,
  }),
);

const { createDataSchema, updateDataSchema } = require("../middleware/validators/dataValidator.middleware");

router.get("/", auth(), awaitHandlerFactory(dataController.getAllData)); // localhost:3000/api/v1/data
router.get("/id/:id/:yymm", auth(), awaitHandlerFactory(dataController.getAllDataSelectDatetime)); // localhost:3000/api/v1/data/id/1/2022-08
router.get("/price/:id/:yymm", auth(), awaitHandlerFactory(dataController.getTotalPrice)); // localhost:3000/api/v1/data/price/1/2022-08
router.post("/", auth(), createDataSchema, awaitHandlerFactory(dataController.createData)); // localhost:3000/api/v1/data
router.patch("/id/:id", auth(Role.Admin), updateDataSchema, awaitHandlerFactory(dataController.updateData)); // localhost:3000/api/v1/data/id/1 , using patch for partial update
router.delete("/id/:id", auth(Role.Admin), awaitHandlerFactory(dataController.deleteData)); // localhost:3000/api/v1/data/id/1

module.exports = router;
