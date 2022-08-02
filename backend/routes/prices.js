var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser')
var pool = require('../db_pool').pool;
router.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
router.use(bodyParser.json())


function getFormatDate(date){
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month > 10 ? month : '0' + month; // 10이 넘지 않으면 앞에 0을 붙인다
    var day = date.getDate();
    day = day > 10 ? day : '0' + day; // 10이 넘지 않으면 앞에 0을 붙인다
    var hours = date.getHours();
    hours = hours > 10 ? hours : '0' + hours; // 10이 넘지 않으면 앞에 0을 붙인다
    var minutes = date.getMinutes();
    minutes =  minutes > 10 ? minutes : '0' + minutes; // 10이 넘지 않으면 앞에 0을 붙인다
    var seconds = date.getSeconds();
    seconds = seconds > 10 ? seconds : '0' + seconds; // 10이 넘지 않으면 앞에 0을 붙인다
 
    // return year + '-' + month + '-' + day;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `
}

var date = getFormatDate(new Date());
console.log(date);

// 단가 조회
router.get('/', function(req,res){
    var sql = mysql.format(
        'select * from PRICE '
    );
    
    pool.getConnection(function(err,conn){
        if (err) throw err;

        conn.query(sql,function(err,result){
            if (err) throw err;
            console.log(result);
            res.send(result);
            });
        });
})


//단가 지정
router.post('/:money', function(req,res){
    const money = req.params.money;
    var sql = mysql.format(
        // 테이블 칼럼 바꿔야됨
        'insert into test_img (name,data_type) values (?,?) '
    );
    
    pool.getConnection(function(err,conn){
        if (err) throw err;

        conn.query(sql,[money,date],function(err,result){
            if (err) throw err;
            console.log(result);
            res.send(result);
            });
        });
})


module.exports = router;