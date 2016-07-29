var express = require('express');
var path = require('path');
var router = express.Router();
var Q = require("q");
var UserInfoLogic = require('../utils/logic/userInfoLogic');
var _=require('lodash');

router.get('/', function(req, res, next) {
	debugger;
	if(req.session.user==null){
		res.redirect("/login");
	}else{
		res.redirect('/demoInfo');
	}
});

//ログイン画面へ
router.get('/login', function(req, res) {
    res.render('login', {});
});

//登录
router.post('/index/signin', function(req, res, next) {
	var articleBean = req.body;

	UserInfoLogic.user_select_one(articleBean, function(err, result){
		if(err){
			res.render('login', {flg:"Error"});
		}else{
			req.session.user = articleBean.userid;
			res.redirect('/demoInfo');
		};
    });
});

module.exports = router;
