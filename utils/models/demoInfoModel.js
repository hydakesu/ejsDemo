var _Base=require('../dbutil');
var util=require('util');
var _=require('lodash');

function DemoInfo(obj){
	if(!obj.form_id){
		var resetObj = {};
		resetObj.form_id      = (obj.form_id)?obj.form_id:GetRandomNum(0, 1000);
		resetObj.form_name    = (obj.form_name)?obj.form_name:"";
		resetObj.form_email   = (obj.form_email)?obj.form_email:"";
		resetObj.form_message = (obj.form_message)?obj.form_message:"";
		obj = resetObj;
	}
	
	this.params = obj;
}

function GetRandomNum(Min,Max){   
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range)) + "";   
}

util.inherits(DemoInfo,_Base);

DemoInfo.prototype.sql_option={
    "select_all":"SELECT * FROM demot",
    "insert":"INSERT INTO demot(id,name,mail,message) VALUES($1,$2,$3,$4)"
};

DemoInfo.prototype.save=function(){
    return this._query(this.sql_option.insert, _.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

DemoInfo.prototype.saveFree=function(sql){
    return this._query(sql, _.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

DemoInfo.prototype.selectAll=function(){
    return this._query(this.sql_option.select_all,[]).then(function(result){
        return result;
    });
}

DemoInfo.prototype.setParams=function(obj){
	this.params = null;
    this.params = obj;
}

module.exports = DemoInfo;