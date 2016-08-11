var _Base=require('../dbutil');
var util=require('util');
var _=require('lodash');

function UserInfo(obj){
	this.params = obj;
}

util.inherits(UserInfo,_Base);

UserInfo.prototype.sql_option={
    "select_one":"SELECT * FROM usert WHERE ID = $1 AND passwd = $2",
    "insert":"INSERT INTO usert(id,name,passwd,validation) VALUES($1,$2,$3,$4)"
};

UserInfo.prototype.save=function(){
    return this._query(this.sql_option.insert,_.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

UserInfo.prototype.saveFree=function(sql){
    return this._query(sql, _.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

UserInfo.prototype.selectOne=function(){
    return this._query(this.sql_option.select_one, _.values(this.params)).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    })
}

UserInfo.prototype.setParams=function(obj){
	this.params = null;
    this.params = obj;
}

module.exports = UserInfo;