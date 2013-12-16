#!/usr/bin/env node

var http = require('http'),fs=require('fs'), qs = require('querystring'), getjson=require('./getjson.js');

var save=function(obj,path){
    var o;
    for(e in obj)o=JSON.parse(e);

    var actualJson= {
    	host: 'localhost',
    	port: 9001,
    	path: path,
    	method: 'GET',
    	headers: { 'Content-Type': 'application/json' }
    };

    getjson.getJSON(actualJson,function(statusCode,result){
	file=path.replace(/\?.*/,"").replace(/^\//,"");
	
	for(t in result.data){
		if(o.id==result.data[t].id){
			for(e in o)result.data[t][e]=o[e];
			break;
		}
	}
    	fs.writeFile(file,JSON.stringify(result,null,4) , function(err) {
    		if(err) {
       	 		console.error("The file "+file+" couldn't be saved!");
       	 		console.log(err);
    		} else {
       	 		console.log("The file "+file+" was saved!");
    		}
    	});		 
    });
}

http.createServer(function (req, res) {
	res.setHeader('content-type', 'application/json');
	service=req.url;
	if (req.method=="PUT" ||req.method=="POST" ){
		var POST={};
        	var b= '';
        	req.on('data', function (d) { b+= d; });
        	req.on('end', function () {
            			POST = qs.parse(b);
				save(POST,service);
        	});
	}
}).listen(7000);
