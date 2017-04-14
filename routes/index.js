var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(true) {
  	res.redirect('/login');
  } else {
  	res.render('index', { title: 'hello world', pageName: 'index' }); //「书剑」·无限战斗
  }
});

module.exports = router;
