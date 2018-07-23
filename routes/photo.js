var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('photo', { title: '图片仓库' });
});

// 上传图片 add ==> post
router.post('/add', function(req, res, next) {
	console.log(1);
  res.send(1);
});

module.exports = router;