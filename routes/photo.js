var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('photo', { title: '图片仓库' });
});

module.exports = router;