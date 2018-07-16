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

//添加分类第一步，判断分类是否已经存在
router.post('/addArticleType', function(req, res, next) {
  var modSql = 'select * from articletype WHERE typeName = ?',
  modSqlParams = [req.body.typeName];
    //请求是否有这个分类
    db.selectWhere(modSql,modSqlParams,function(data){

      //判断这个分类是否存在
      if(data.length !== 0){
        res.send("201");
      }else {
        next();
      }
      
    },function(req){
      res.send(req);
    })
});

//添加分类第二步，分类添加到数据库
router.post('/addArticleType', function(req, res, next) {
    var modSql = 'INSERT INTO articletype (typeName) VALUES(?)',
    modSqlParams = [req.body.typeName];
    db.Insert(modSql,modSqlParams,function(req){
      console.log(req);
      if(req.affectedRows == 1){
        res.send("200");
      }else {
        res.send(req);
      }
      
    })
    
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
  var modSql = 'UPDATE blogInfo SET siteName = ?,siteIcp = ?,siteCopy = ? WHERE Id = ?',
  modSqlParams = [req.body.siteName, req.body.siteIcp,req.body.siteCopy,1];
  db.update(modSql,modSqlParams,function(req){
    var req = req;
    if(req==1){
     res.send(200); 
    }   
  },function(req){
    res.send(req);
  })
});

module.exports = router;
