var express = require('express');
var router = express.Router();
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var mysql = require('mysql');
var bodyParser = require('body-parser');
const { request } = require('express');
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
  var data_type = req.body.data_type;
  var species = req.body.species;
  var id = 0;

   //mission_id 생성
  var sql = mysql.format(
    'SELECT COUNT(*) FROM test_img WHERE species = ?'
  );

    var results = [];
      pushResults = function (rows) {
        results.push(rows);
   }

   res.send()
  // pool.getConnection(function (err,conn){
  //       if (err) throw err;
  //         conn.query(sql,[species],function (err, result, fileds){
  //             if (err) throw err;
  //             //console.log(result['COUNT(*)']);
  //             console.log(result)
  //             return result;
  //           });  
  // });

count = async(callback) => {
  return pool.getConnection(function (err,conn){
   conn.query(sql,[species],function (err, result, fileds){
    if (err) {
      callback(err);
    }
    callback(null,result);
  }) 
  })
};

selectMethod = () => {
  count((err, result) => {
      console.log(result);
      id = result;
      console.log("안 id",id)
  });
}

console.log("밖 id",id)

  //Data insert
  // var sql = mysql.format(
  //   'INSERT INTO test_img (name,data_type,species) VALUES (?,?,?)'
  //   //,[req.query.nodes]
  // );
  
  // pool.getConnection(function(err,conn){
  //     if (err) throw err;

  //     var arr = new Array();

  //     for(var i=0; i<req.files.length; i++){
  //     arr[i] = req.files[i].filename;
  //   }
    
  //   var str = arr.join();


  //     conn.query(sql,[str,id,species],function(err, result, fileds){
  //         if (err) throw err;
  //         console.log(result);
  //         res.send('db insert ok');
  //     });
  //     })
 
 });


//데이터 전체 조회
router.get('/',function(req,res){
  console.log("root")
  console.log("req", req.params)
  
  var sql = mysql.format(
    'select * from DATA'
  );

  pool.getConnection(function(err,conn){
    if (err) throw err;

    conn.query(sql,function(err,result){
        if (err) throw err;
        console.log(result);
        res.send(result);
        });
    });
 });


 // id 데이터 조회
 router.get('/:id',function(req,res){

  const id = req.params.id;

  var sql = mysql.format(
    'select * from DATA where num = ?'
  );

  pool.getConnection(function(err,conn){
    if (err) throw err;

    conn.query(sql,[id],function(err,result){
        if (err) throw err;
        console.log(result);
        res.send(result);
        });
    });
 });

 // 데이터 삭제
 router.delete('/:id',function(req,res){

  const id = req.params.id;
  var sql = mysql.format(
    'delete from DATA where num = ?'
  );

  pool.getConnection(function(err,conn){
    if (err) throw err;

    conn.query(sql,[id],function(err,result){
        if (err) throw err;
        console.log(result);
        res.send(result);
        });
    });
 });

 // 데이터 수정(컬럼 추가하기)
 router.put('/:id',function(req,res){

  const id = req.params.id;
  var refer = req.params.refer;

  var sql = mysql.format(
    'update DATA set num = ? where num =?'
  );

  pool.getConnection(function(err,conn){
    if (err) throw err;

    conn.query(sql,[refer,id],function(err,result){
        if (err) throw err;
        console.log(result);
        res.send(result);
        });
    });
 });

module.exports = router;