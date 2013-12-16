#!/usr/bin/env node 

var httpProxy = require('http-proxy');
var bhostservicios="localhost", bportservicios=7000;
var bhostweb="localhost", bportweb=8001;

httpProxy.createServer(function (req, res, proxy) { 
  if(req.method=="GET"){
	proxy.proxyRequest(req, res, { host: bhostweb, port: bportweb})
  }else if(req.method=="PUT" ||req.method=="POST" ){
	proxy.proxyRequest(req, res, { host: bhostservicios, port: bportservicios})
  } else {
	console.log("request method "+req.method+" not available yet" );
  }
}).listen(9001);

console.log("\n\n\nLa aplicación está corriendo en: http://localhost:9001/\n\n\n\n");

