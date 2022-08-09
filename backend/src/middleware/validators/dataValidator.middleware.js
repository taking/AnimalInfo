const { body } = require('express-validator');

 exports.createDataSchema = [
//      body('refer')
//         .exists()
//         .withMessage('refer is required'),
//     body('data_type')
//         .exists()
//         .withMessage('data type is required'),
//     body('species')
//         .exists()
//         .withMessage('species is required'),
//     body('dogRace')
//         .exists()
//         .withMessage('dogRace is required'),
//     body('catRace')
//         .exists()
//         .withMessage('catRace is required'),
//     body('birth')
//         .exists()
//         .withMessage('birth is required'),
//     body('sex')
//         .exists()
//         .withMessage('sex is required'),
//     body('weight')
//         .exists()
//         .withMessage('weight is required'),
//     body('shoulderHeight')
//         .exists()
//         .withMessage('shoulderHeight is required'),
//     body('neckSize')
//         .exists()
//         .withMessage('neckSize is required'),
//     body('backLength')
//         .exists()
//         .withMessage('backLength is required'),
//     body('chestSize')
//         .exists()
//         .withMessage('chestSize is required'),
//     body('BCS')
//         .exists()
//         .withMessage('BCS is required'),
//     body('exercise')
//         .exists()
//         .withMessage('exercise is required'),
//     body('foodCount')
//         .exists()
//         .withMessage('foodCount is required'),
//     body('environment')
//         .exists()
//         .withMessage('environment is required'),
//     body('defecation')
//         .exists()
//         .withMessage('defecation is required'),
//     body('foodAmount')
//         .exists()
//         .withMessage('foodAmount is required'),
//     body('snackAmount')
//         .exists()
//         .withMessage('snackAmount is required'),
//     body('foodKind')
//         .exists()
//         .withMessage('foodKind is required'),
//     body('disease')
//         .exists()
//         .withMessage('disease is required'),
//     body('CPR')
//         .exists()
//         .withMessage('CPR is required'),
//     body('lgG')
//         .exists()
//         .withMessage('lgG is required'),
//     body('IL6')
//         .exists()
//         .withMessage('IL6 is required'),
//     body('AFP')
//         .exists()
//         .withMessage('AFP is required'),
//     body('heartRate')
//         .exists()
//         .withMessage('heartRate is required'),
//     body('breatingRate')
//         .exists()
//         .withMessage('breatingRate is required'),
//     body('bodyHeat')
//         .exists()
//         .withMessage('bodyHeat is required'),
//     body('stress')
//         .exists()
//         .withMessage('stress is required'),
//     body('imgAllFront')
//         .exists()
//         .withMessage('imgAllFront is required'),
//     body('imgAllTop')
//         .exists()
//         .withMessage('imgAllTop is required'),
//     body('imgAllLeft')
//         .exists()
//         .withMessage('imgAllLeft is required'),
//     body('imgAllRight')
//         .exists()
//         .withMessage('imgAllRight is required'),
//     body('imgAllBack')
//         .exists()
//         .withMessage('imgAllBack is required'),
//     body('imgHeadFront')
//         .exists()
//         .withMessage('imgHeadFront is required'),
//     body('imgHeadTop')
//         .exists()
//         .withMessage('imgHeadTop is required'),
//     body('imgHeadLeft')
//         .exists()
//         .withMessage('imgHeadLeft is required'),
//     body('imgHeadRight')
//         .exists()
//         .withMessage('imgHeadRight is required'),
//     body('imgHeadBottom')
//         .exists()
//         .withMessage('imgHeadBottom is required'),
//     body('imgNoseFront')
//         .exists()
//         .withMessage('imgNoseFront is required'),

 ];

exports.updateDataSchema = [
    // body('name')
    //     .optional()
    //     .isLength({ min: 3 })
    //     .withMessage('Must be at least 3 chars long'),
    // body('password')
    //     .optional()
    //     .notEmpty()
    //     .isLength({ min: 6 })
    //     .withMessage('Password must contain at least 6 characters')
    //     .isLength({ max: 10 })
    //     .withMessage('Password can contain max 10 characters')
    //     .custom((value, { req }) => !!req.body.confirm_password)
    //     .withMessage('Please confirm your password'),
    // body('confirm_password')
    //     .optional()
    //     .custom((value, { req }) => value === req.body.password)
    //     .withMessage('confirm_password field must have the same value as the password field'),
    // body('email')
    //     .optional()
    //     .isEmail()
    //     .withMessage('Must be a valid email')
    //     .normalizeEmail(),
    // body('contact')
    //     .optional()
    //     .isLength({ min: 3 })
    //     .withMessage('Must be at least 3 chars long'),
    // body('refer')
    //     .optional()
    //     .isAlpha()
    //     .withMessage('Must be only alphabetical chars')
    //     .isLength({ min: 3 })
    //     .withMessage('Must be at least 3 chars long'),
    // body('enabled')
    //     .optional()
    //     .isNumeric()
    //     .isIn([Account.Enabled, Account.Disabled])
    //     .withMessage('Invalid Account Status type'),
    // body('role')
    //     .optional()
    //     .isNumeric()
    //     .isIn([Role.Admin, Role.User])
    //     .withMessage('Invalid Role type'),
    // body()
    //     .custom(value => {
    //         return !!Object.keys(value).length;
    //     })
    //     .withMessage('Please provide required field to update')
    //     .custom(value => {
    //         const updates = Object.keys(value);
    //         const allowUpdates = ['name', 'password', 'confirm_password', 'email', 'contact', 'refer', 'enabled', 'role'];
    //         return updates.every(update => allowUpdates.includes(update));
    //     })
    //     .withMessage('Invalid updates!')
];