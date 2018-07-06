var express = require('express');
var router = express.Router();
var db = require('../modules/db');

//首页
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

//列表页
router.get('/list', function(req, res, next) {
  res.render('list', { title: '列表' });
});

module.exports = router;
