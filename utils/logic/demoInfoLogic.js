var DemoInfo=require('../models/demoInfoModel'); //引入刚才定义的 jobInfo 实体类.

exports.demo_save=function(demoObj, callback){
    //实例化时传入一个对象
    var demoInfo=new DemoInfo(demoObj);
	
    //调用 jobInfo 对象上的 save 方法.
    demoInfo.save().then(function(result){
        //callback 直接返回给了控制层
        callback(null, result);
    }).catch(function(err){
        //异常返回
        callback(err, null)
    });
};

exports.demo_select_all=function(demoObj, callback){
    var demoInfo = new DemoInfo();
    demoInfo.selectAll().then(function(result){
        callback(null, result);
    }).catch(function(err){
        //异常返回
        callback(err, null)
    });
}