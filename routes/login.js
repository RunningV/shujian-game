var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
	if(false) {
		res.redirect('/index');
	} else {
  	res.render('login', { title: 'hello world', pageName: 'login' }); //「书剑」·无限战斗
	}
});

module.exports = router;
