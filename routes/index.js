var express = require('express');
var router = express.Router();
var db = require('../modules/db');

//首页
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

//登陆页
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

//列表页
router.get('/list', function(req, res, next) {
  res.render('list', { title: '文章列表' });
});

//站点信息页 get
router.get('/webInformation', function(req, res, next) {
  
  //请求获取站点信息
  db.selectAll('select * from blogInfo',function(data){
  	res.render('webInformation', { title: '网站信息',siteInfo:data[0] });
  },function(req){
  	res.send(req);
  })
  
});

//站点信息页 post
router.post('/webInformation', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
