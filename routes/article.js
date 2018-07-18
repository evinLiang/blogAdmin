var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var time = require('../modules/time');

/* GET users listing. */
router.get('/', function(req, res, next) {

  //获取所有文章
  db.selectAll('SELECT * from  articleList INNER JOIN articleType ON articleList.typeId=articleType.typeId',function(data){
    console.log(data);
    res.render('Article', { title: '文章列表', articleList: data });
  },function(req){
    res.send(req);
  })


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

/* 添加文章post */
router.post('/add', function(req, res, next) {
  var datetime = time.getNowFormatDate();
  var modSql = 'INSERT INTO articleList (title,typeId,imgUrl,content,click,datetime) VALUES(?,?,?,?,?,?)',
  modSqlParams = [req.body.articleTitle,req.body.articleTypeId,req.body.articleUrl,0,req.body.articleContent,datetime];
  db.Insert(modSql,modSqlParams,function(req){
    //console.log(req);
    if(req.affectedRows == 1){
      res.send("200");
    }else {
      res.send(req);
    }
    
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
