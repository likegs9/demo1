var express = require('express');
var router = express.Router();
var todoModel = require('../model');//不获取index.js是他会自动找到model文件夹然后获取文件
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});
//一个路径不同方法不同处理
router.route('/todos').get(function (req, res, next) {
	//从数据库获取所有数据 {}代表查所有
	todoModel.find({}, function (err, todeos) {
		if (err) {
			res.send({code: 0, msg: '查询错误'})
		} else {
			res.send(todeos)
		}
	})
}).post(function (req, res, next) {
	var todo = req.body;
	//获取的是一个对象
	todoModel.create(todo, function (err, todo) {
		if (err) {
			console.log('error')
			res.send({code: 0, msg: '查询错误'})
		} else {
			console.log('ok')
			res.send(todo)
		}
	})
});
router.delete('/todos/:id',function (req, res, next) {
	todoModel.remove({_id:req.params.id},function(err,result){
		if (err) {
			res.send({code: 0, msg: '删除错误'})
		} else {
			res.send({code: 1, msg: '删除成功'})
		}
	})
});
router.post('/todos/delte',function (req, res, next) {
	var ids=req.body;
	console.log(req.body)
	todoModel.remove({_id:{$in:ids}},function(err,result){
		if(err){
			console.log('error')
			res.send({code: 0, msg: '删除错误'})
		}else{
			console.log('ok');
			res.send({code: 1, msg: '删除成功'})
		}
	})

});
module.exports = router;
