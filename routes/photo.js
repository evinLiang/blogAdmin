var express = require('express');
var router = express.Router();
var formidable = require("formidable"); 
var db = require('../modules/db');
var OSS = require('ali-oss');
var config = require('../modules/ossConfig');	//oss的Config
var time = require('../modules/time');	//时间出来
var client = new OSS(config);

// /photo
router.get('/', function(req, res, next) {

	res.render('photo', { title: '图片仓库'});
});

// 显示图片
router.get('/get', function(req, res, next) {

	//获取所有图片
	db.selectAll('SELECT * from ossphoto',function(data){
		res.send(data);
	})
});

// 上传图片 add ==> post
router.post('/add', function(req, res, next) {
	var form = new formidable.IncomingForm();  
    form.parse(req, function(err, fields, files) {
    	var d = new Date();  
        name = d.getTime()+files.myfile.name;
        img = files.myfile.path;
        client.put(name, img).then(function (val) {
		  
		  var imgurl = val.res.requestUrls[0];	//取得oss图片上传后的图片url
		  var datetime = time.getNowFormatDate();	//时间
		  //图片入库
		  var modSql = 'INSERT INTO ossphoto (imgUrl,datetime) VALUES(?,?)',
		  modSqlParams = [imgurl,datetime];
		  db.Insert(modSql,modSqlParams,function(req){
		    if(req.affectedRows == 1){
		      res.send("200");
		    }else {
		      res.send(req);
		    }   
		  }) 

		}).catch(function (err) {
			  res.send(err);
		});	

    }); 
});

module.exports = router;