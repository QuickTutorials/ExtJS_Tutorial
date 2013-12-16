#!/usr/bin/env node

var fs = require('fs'),exec=require('child_process').exec;
var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
        	results.push(file);
		results = results.concat(walk(file));
	}
        //else results.push(file);
    })
    return results;
}
var watchPath=function(path){
 fs.watch(path, function (event, filename) {
  ignores=[/^\./];
  for(i in ignores)if(filename.match(ignores[i]))return;
  if (filename) {
    console.log(path+'/'+filename+' :'+event );
    //if(filename.match(/js$/))exec("./restart_servers.sh", function(){});
  } else {
    console.log('unknown file modified: '+event);
  }
 });
}

w=walk(".");
w.push(".");
for(e in w){ watchPath(w[e]); }
