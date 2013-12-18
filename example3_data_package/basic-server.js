#!/usr/bin/env node

var http = require('http'),fs=require('fs'), qs = require('querystring'), getjson=require('./getjson.js');

var saveJson=function(o,path){
     var actualJson= {
    	host: 'localhost',
    	port: 9001,
    	path: path,
    	method: 'GET',
    	headers: { 'Content-Type': 'application/json' }
     };
     var _obj;
     if(!o.length)_obj=[o];
     else _obj=o;
     getjson.getJSON(actualJson,function(statusCode,actual){
      for(e in _obj){
      s=_obj[e];
	file="."+path.replace(/\?.*/,"");
	for(t in actual.data){
	 if(s.id==actual.data[t].id){
	  for(el in s)actual.data[t][el]=s[el];
	 }
	}
      }
      fs.writeFile(file,JSON.stringify(actual,null,4) , function(err) {
    		if(err) {
       	 		console.error("The file "+file+" couldn't be saved!");
       	 		console.log(err);
    		} else {
       	 		console.log("The file "+file+" was saved!");
    		}
      });		 
    }); 
}

var save=function(obj,path){
    for(o in obj){
    	var o=JSON.parse(o);
    	saveJson(o,"/blog-posts.json");
    }
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
	res.end("{}");
}).listen(7000);
