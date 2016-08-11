var UserInfo=require('../models/userInfoModel'); //引入刚才定义的 jobInfo 实体类.

exports.user_save=function(demoObj, callback){
    //实例化时传入一个对象
    var userInfo=new UserInfo(demoObj);
	
    //调用 jobInfo 对象上的 save 方法.
    userInfo.save().then(function(result){
        //callback 直接返回给了控制层
        callback(null, result);
    }).catch(function(err){
        //异常返回
        callback(err, null)
    });
};

exports.user_select_one=function(demoObj, callback){
    var userInfo = new UserInfo(demoObj);
//    var result = userInfo.selectOne().then(function(result){
//		//console.log("pg.callback=" + JSON.stringify(result));
//		//console.log("pg.callback=" + typeof callback);
//        callback(null, result);
//    }).catch(function(err){
//        //异常返回
//        callback(err, null)
//    });
	
	var result = userInfo.selectOne();
	
	callback(null, result);
}