const { body } = require('express-validator');

exports.createHistorySchema = [
    body('name')
        .exists()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('dataId')
        .exists()
        .notEmpty()
        .withMessage('dataId is required')
        .isLength({ max: 10 })
        .withMessage('DataId can contain max 10 characters'),
    body('action')
        .exists()
        .notEmpty()
        .withMessage('Action is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
];