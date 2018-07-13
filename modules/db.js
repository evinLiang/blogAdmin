const mysql = require('mysql');		//引入mysql模块

//数据库信息
const databaseConfig = require('./databaseConfig');

module.exports = {

	//查询所有数据,并且返回数据
	selectAll:function(sqllan,success,error){

		//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
		var connection = mysql.createConnection(databaseConfig);

		//数据库是否链接成功
		connection.connect(function(err){
			if(err){
				error("数据库连接失败："+err);
				return;
			}
		});
		var sql = sqllan;
		if(!sql) return;

		//查询数据
		connection.query(sql,function(err,rows,fields){
			if(err){
				//console.log(err);
				error("数据库查询失败："+err);
				return
			}
			success(rows)
		});

		//关闭数据库
		connection.end(function(err){
			if(err){
				return
			}else {
				console.log('关闭连接');
			}
		});
	},

	//更改数据
	update:function(sqllan,SqlParams,success,error){

		//每次使用的时候需要创建链接，数据操作完成之后要关闭连接
		var connection = mysql.createConnection(databaseConfig);

		//数据库是否链接成功
		connection.connect(function(err){
			if(err){
				error("数据库连接失败："+err);
				return;
			}
		});
		var sql = sqllan;
		var SqlParams = SqlParams;
		if(!sql && !SqlParams) {
			//console.log("sql或者SqlParams不能为空");
			error("sql或者SqlParams不能为空");
			return;
		};

		//更新数据
		connection.query(sql,SqlParams,function (err, result) {
			if(err){
				 error("更新失败："+err);
		         return;
		   }  
		   success(result.affectedRows)
		});

		//关闭数据库
		connection.end(function(err){
			if(err){
				return
			}else {
				console.log('关闭连接');
			}
		});
	}
};

