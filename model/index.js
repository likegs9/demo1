var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gs');
//定义一个模型并导出
//定义的是todo集合所有的文档
module.exports=mongoose.model('todo',mongoose.Schema({
	text:String
}))