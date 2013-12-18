#!/usr/bin/env node

var http = require('http'),fs=require('fs');
var logStream = fs.createWriteStream('../app.log', {flags: 'a'});
logStream.write("starting "+__filename+"\n");

http.createServer(function (req, res) {
	file=("./"+req.url).replace(/\?.*/,"");
	if(file.match(/json$/))res.setHeader('content-type', 'application/json');
	else res.setHeader('content-type', 'text/html');
	fs.readFile(file, 'utf8', function(err, data) {
  		if (err){
		  try{
			stat=fs.statSync(file);
			if(stat.isDirectory()){
				result={
					"type":"dir",
					"children":[]
				}
				files=fs.readdirSync(file);
				for(f in files){
					result.children.push(files[f]);
				}
				res.end(JSON.stringify(result));
			}
		   }catch(error){
			//throw err;
			console.log("could find "+file);
		   }
		}
		res.end(data);
	});
}).listen(8001);
