var pg = require('pg');
var logger = require('./logger');
var conf=require("../config.js");
var Q = require("q");

function _Base() {
}

_Base.prototype._connect = function (callback) {
    var defer = Q.defer();
    pg.connect(conf, function (err, client, done) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve({client: client, done: done});
        }
    });
    return defer.promise.nodeify(callback);
};

_Base.prototype._query = function (sql, params, callback) {
    if (typeof params == 'function') {
        callback = params;
        params = [];
    }
    if (!params) {
        params = [];
    }
    if (!sql) {
        var err = new Error("sql is empty!");
        var defer3 = Q.defer();
        return defer3.reject(err).nodeify(callback);
    }

    if (conf.debug) {
        console.log('[SQL:]', sql, '[:SQL]');
        console.log('[PARAMS:]', params, '[:PARAMS]');
    }
    return this._connect()
        .then(function (result) {
            var client = result.client;
            var done = result.done;
            var defer = Q.defer();
            client.query(sql, params, function (err, result) {
                done();
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            })
			
            return defer.promise;
        })
        .nodeify(callback);
		console.log("_query=" + callback);
};

module.exports = _Base;