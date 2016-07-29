var express = require('express');
var path = require('path');
var fs=require("fs");
var favicon = require('serve-favicon');
var logger = require('morgan');//输出日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var session=require("express-session");
var handlebars = require('express-handlebars')
var pg = require('pg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('routes',__dirname + '/routes/');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'demo', 
                  cookie: { maxAge: 60000*3 },
				  saveUninitialized:true,
				  resave:true
				}));
app.use(express.static(path.join(__dirname, 'public')));

//控制层_根据routes文件名+方法_约定请求路径
var routes=app.get("routes");
fs.readdirSync(routes).forEach(function(fileName) {
    var filePath = routes + fileName;
    var rname=fileName.substr(0,fileName.lastIndexOf("."));
    if(!fs.lstatSync(filePath).isDirectory()) {
       if(rname==="index"){
           app.use("/", require(filePath));
       }else{
           app.use("/"+rname, require(filePath));
       }
    }
});

i18n.configure({
    locales:['en_US', 'zh_CN', 'ja_JP'],  // setup some locales - other locales default to en_US silently
    defaultLocale: 'ja_JP',
    directory: __dirname + '/i18n',  // i18n 翻译文件目录，我的是 i18n， 可以写成其他的。
    updateFiles: false,
	register: global,
    extension: '.js'  // 由于 JSON 不允许注释，所以用 js 会方便一点，也可以写成其他的，不过文件格式是 JSON
});

app.use(i18n.init);

// 添加setLocale中间件，注意必须在session之后
app.use(setLocale);

// 定义setLocale中间件
function setLocale(req, res, next){
    var locale = 'zh-CN';
    req.setLocale(locale);

    next();
};

//Session拦截控制
app.all('*',function(req,res,next){
	if(req.session.user==null){
		res.redirect("/login");
	}else{
		next();
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(app.get('env'));
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
