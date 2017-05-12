var Info = require('../../db/model/info.js');
var Article = require('../../db/model/article.js')
var Category = require('../../db/model/category.js')
var Recommend = require('../../db/model/recommend.js')

module.exports = function (app) {
	app.get('/index', function (req, res) {
		res.render('user');
	});
	app.get('', function (req, res) {
		res.render('user');
	});

	app.get('/test', function (req, res) {
		res.render('user');
	})

	app.get('/article/details/:id', function (req, res) {
			res.render('user');
	});

	app.get('/user/info', function (req, res) {
		res.json({
			code: 1,
			data: {
				name: '胡元港',
				description: '书籍是人类进步的阶梯',
				address: '四川，绵阳，涪城区',
				email: '1730790894@qq.com'
			}
		})
	});
	app.get('/articles', function (req, res) {
		Article.find({status:true}, function (err, cb) {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			}
			else {
				res.json({
					success: true,
					data: cb
				})
			}
		})
	});
	app.get('/article/details/:id/data', function (req, res) {
		Article.findOne({ _id: req.params.id }, function (err, cb) {
			if(err){
				res.json({
					success:false,
					data:err
				})
			}
			else{
				cb.pv++;
				cb.save((err)=>{
					if(err){
						console.log(err);
					}
					else{
						res.json({
							success:true,
							data:cb
						});
					}
				})
				
			}
		})
	})

	app.get('/categories', function (req, res) {
		Category.find({}, function (err, cb) {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			}
			else {
				res.json({
					success: true,
					data: cb
				})
			}
		})
	})

	app.get('/recommends', function (req, res) {
		Recommend.find({}, function (err, cb) {
			if (err) {
				res.json({
					error: true,
					data: err
				})
			}
			else {
				res.json({
					success: true,
					data: cb
				})
			}
		})
	})
}