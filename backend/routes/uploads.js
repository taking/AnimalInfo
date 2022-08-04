var express = require('express');
var router = express.Router();
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var mysql = require('mysql');
var bodyParser = require('body-parser')
var pool = require('../db_pool').pool;

router.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
router.use(bodyParser.json())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './file/')
  },
  filename(req, file, cb) { // 파일명을 어떤 이름으로 올릴지
    cb( null, `${req.body.data_type}_${req.body.species}_${file.originalname}` );
}
});

var upload = multer({ storage: storage })

router.post('/', upload.array('userfile'), function (req, res)  {

var sql = mysql.format(
  'insert into test_img (name,data_type,species) values (?,?,?)'
  //,[req.query.nodes]
);


pool.getConnection(function(err,conn){
  if (err) throw err;

  var arr = new Array();

  for(var i=0; i<req.files.length; i++){
   arr[i] = req.files[i].filename;
  }
  
var str = arr.join();

conn.query(sql,[str,req.body.data_type,req.body.species],function(err, result, fileds){

  if (err) throw err;
  console.log(result);
   res.send('db insert ok');
});
})

});


module.exports = router;