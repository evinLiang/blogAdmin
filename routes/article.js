var express = require('express');
var router = express.Router();
var db = require('../modules/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('article', { title: '文章列表' });
});

/* 添加文章get */
router.get('/add', function(req, res, next) {

  //请求获取站点信息
  db.selectAll('select * from articleType',function(data){
    console.log(data);
    res.render('addArticle', { title: '添加文章',articleType: data });
  },function(req){
    res.send(req);
  })

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
      //console.log(req);
      if(req.affectedRows == 1){
        res.send("200");
      }else {
        res.send(req);
      }
      
    })   
});

module.exports = router;
