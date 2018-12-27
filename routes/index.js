var express = require('express');
var router = express.Router();

/**
 * 数据库
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/**
 * 数据库加密
 */
var crypto = require('crypto');


var users = {};

router.get('/regist', function(req, res, next) {
  res.render('signup', { title: '注册' , user: {}, wrong:{}});
});

/**
 * 注册, 如果成功就向数据库中插入数据
 */
router.post('/regist', function(req, res, next) {
	var user = req.body;
	try{
		/**
		 * 数据库插入文档
		 */
		MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("runoob");
	    var myobj = user;

	    /**
	     * 先查询是否有此数据, 有的话就提示已经重复, 没有的话就跳转
	     */
	    var whereStr = {};
	    whereStr.username = user.username;
    	dbo.collection("site").find(whereStr).toArray(function(err, result) {
    		if(err) throw err;

    		//数据库中不存在此数据
    		if(result === undefined || result.length == 0){

    			//进行加密
    			var password = myobj.password;
    			var md5 = crypto.createHash('md5');
    			md5.update(password);
    			var afterHash = md5.digest('hex');
    			myobj.password = afterHash;


    			dbo.collection("site").insertOne(myobj, function(err, resu) {
		        if (err) throw err;
		        console.log("文档插入成功");
				const session = req.session;
				session.user = user;
				res.redirect('/detail');
		        db.close();
		    	});
    		}
    		else{
    			console.log("此用户已经存在 !!!");
    			res.render('signup', { title: '注册' , user: user, wrong:{temp:'此用户已经存在 !!!'}});
    		}
    	});
		});
	}catch(err){
		res.render('signup', { title: '注册' , user: user, wrong:{},err: err.message});
	}
});

router.get('/', function(req, res, next){
	req.session.user? res.redirect('/detail'): res.redirect('/signin');
})

router.get('/signin', function(req, res, next){
	res.render('signin', {title: '登录', user:{}});
})
/**
 * 判断账户名与密码是否与数据库中的一致, 不一致就报错, 一致就重定向
 */ 
router.post('/', function(req, res, next){
	var user = req.body;

	/**
	 * 数据库查询
	 */
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = user;  // 查询条件
    //进行加密
    var password = whereStr.password;
    var md5 = crypto.createHash('md5');
    md5.update(password);
    var afterHash = md5.digest('hex');
    whereStr.password = afterHash;

    dbo.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result === undefined || result.length == 0){
        	console.log("数据查询失败!!! 不存在这样的账户!!!");
        	res.render('signin', {title:'登录', user:{temp:'用户名或密码错误 !!!'}});
        }
        else{
	        console.log("数据查询成功!!!");
	        var user = result[0];
	        const session = req.session;
			session.user = user;
	        res.redirect('/detail');
	    }
        db.close();
    });
});
})

router.post('/signin', function(req, res, next){
	var user = req.body;

	/**
	 * 数据库查询
	 */
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = user;  // 查询条件

    //进行加密
    var password = whereStr.password;
    var md5 = crypto.createHash('md5');
    md5.update(password);
    var afterHash = md5.digest('hex');
    whereStr.password = afterHash;

    dbo.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result === undefined || result.length == 0){
        	console.log("数据查询失败!!! 不存在这样的账户!!!");
        	res.render('signin', {title:'登录', user:{temp:'用户名或密码错误 !!!'}});
        }
        else{
	        console.log("数据查询成功!!!");
	        var user = result[0];
	        const session = req.session;
			session.user = user;
	        res.redirect('/detail');
	    }
        db.close();
    });
});
})

router.get('/detail', function(req, res, next) {
 	res.render('detail', { title: '详情', user: req.session.user , wrong:{}});
});

router.post('/detail', function(req, res, next){
	const session = req.session;
	delete session.user;
	res.redirect('signin');
});

router.get('/yourdetail', function(req, res, next) {
 	res.render('detail', { title: '详情', user: req.session.user , wrong:{temp:'注意, 你只能访问自己的数据 !!!'}});
});

router.post('/yourdetail', function(req, res, next){
	const session = req.session;
	delete session.user;
	res.redirect('signin');
});

router.all('*', function(req, res,next){
	req.session.user? res.redirect('/yourdetail'): res.redirect('/signin');
});



module.exports = router;
