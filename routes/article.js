var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var time = require('../modules/time');
var moment = require('moment');

//文章列表 ==> get
router.get('/', function(req, res, next) {

  //获取所有文章
  db.selectAll('SELECT * from  articleList INNER JOIN articleType ON articleList.typeId=articleType.typeId ORDER BY datetime desc',function(data){

    //data 为返回的所有数据
    //定义数据
    var articles = [];

    for (item in data){

      //push数组
      articles.push({
        title:data[item].title,
        id:data[item].id,
        typeName:data[item].typeName,
        click:data[item].click,
        imgUrl:data[item].imgUrl,
        content:data[item].content,
        datetime:moment(data[item].datetime).format('YYYY'+'年'+'MM'+'月'+'DD'+'日-'+'H'+':'+'mm') //转义数据
      })
    }
    
    //获取文章类型
    db.selectAll('select * from articleType',function(Typedata){
      
      res.render('Article', { title: '文章列表', articleList: articles,articleType: Typedata });
    },function(req){
      res.send(req);
    })
  },function(req){
    res.send(req);
  })

});

//添加文章 ==> get
router.get('/add', function(req, res, next) {

  //获取文章类型
  db.selectAll('select * from articleType',function(data){
    //console.log(data);
    res.render('addArticle', { title: '添加文章',articleType: data });
  },function(req){
    res.send(req);
  })

});

//添加文章 ==> post
router.post('/add', function(req, res, next) {

  //添加文章入库
  var datetime = time.getNowFormatDate();
  var modSql = 'INSERT INTO articleList (title,typeId,imgUrl,content,click,datetime,updatatime) VALUES(?,?,?,?,?,?,?)',
  modSqlParams = [req.body.articleTitle,req.body.articleTypeId,req.body.articleUrl,req.body.articleContent,0,datetime,datetime];
  db.Insert(modSql,modSqlParams,function(req){
    //console.log(req);
    if(req.affectedRows == 1){
      res.send("200");
    }else {
      res.send(req);
    }   
  }) 

});


//更新文章 ==> get
router.get('/updata/:id', function (req, res, next) {


  //获取文章详情信息
  var modSql = 'select * from articleList WHERE id = ?',
  modSqlParams = [req.params.id];
    db.selectWhere(modSql,modSqlParams,function(data){

        // data 为返回来的文章详情数据

        //获取所有文章类型
        db.selectAll('select * from articleType',function(typedata){
          var articleType = typedata; //文章类型
          res.render('updataArticle', { title: '更新文章',articleDetails: data[0],articleType:articleType });
        },function(req){
          res.send(req);
        })
    },function(req){
      res.send(req);
    })
});

//更新文章 ==> post
router.post('/updata', function (req, res, next) {

  var datetime = time.getNowFormatDate();
  var modSql = 'UPDATE articleList SET title = ?,typeId = ?,imgUrl = ?,content = ?,updatatime = ? WHERE Id = ?',
  modSqlParams = [req.body.articleTitle, req.body.articleTypeId,req.body.articleUrl,req.body.articleContent,datetime,req.body.articleId];
  db.update(modSql,modSqlParams,function(req){
    var req = req;
    if(req==1){
     res.send(200); 
    }   
  },function(req){
    res.send(req);
  })
});

//提交分类 ==> post 第一步，判断分类是否已经存在
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

//提交分类 ==> post 第二步，分类添加到数据库
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


//删除文章 ==> post
router.post('/del', function(req, res, next) {
  var modSql = 'DELETE FROM articleList WHERE id = ?',
  modSqlParams = [req.body.id];
  db.delect(modSql,modSqlParams,function(req){
    //console.log(req);
    if(req.affectedRows == 1){
      res.send("200");
    }else {
      res.send(req);
    }
    
  }) 
})

module.exports = router;
