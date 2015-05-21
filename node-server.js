var connect = require('connect');
var serveStatic = require('serve-static');
var port = process.argv[2] ? process.argv[2] : 8081;
connect().use(serveStatic(__dirname)).listen(port);
console.log("listening on :" + port);