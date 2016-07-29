var express = require('express');
var router = express.Router();
var DemoInfoLogic = require('../utils/logic/demoInfoLogic');

router.get('/', function(req, res, next) {
	res.render('sqlDemo', { title: 'Express' , path: __dirname});
});

router.post("/saveDemo", function (req, res, next) {
    var articleBean = req.body;
    DemoInfoLogic.demo_save(articleBean, function(err, result){
        if(err){
			next(err);
		}else{
			res.send(result);
		}
    });
});

module.exports = router;