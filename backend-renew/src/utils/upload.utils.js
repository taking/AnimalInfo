const path = require('path');
var multer = require('multer');
const res33 = path.resolve('src', 'file');

storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, res33)
    },
    filename(req, file, cb) { // 파일명을 어떤 이름으로 올릴지
        cb( null, `${req.body.dataTypes}_${req.body.species}_${file.originalname}` );
  }
  });
  
// upload = multer({ storage: storage }).array('imgNoseFront');
upload = multer({ storage: storage })
  .fields([
    // { name : "imgAllFront"},
    // { name : "imgAllTop"},
    // { name : "imgAllLeft"},
    // { name : "imgAllRight"},
    // { name : "imgAllBack"},
    // { name : "imgHeadFront"},
    // { name : "imgHeadTop"},
    // { name : "imgHeadLeft"},
    // { name : "imgHeadRight"},
    { name : "imgHeadBottom"},
    { name : "imgNoseFront"},
])


module.exports = upload;

