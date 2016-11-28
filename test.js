const Porty = require('./index.js');

var portMin = 8080;
var portMax = 8090;
var portsToAvoid = [8100, 8002, 8003, 8007, 8005];

Porty.get(portMin, portMax, portsToAvoid, function (port) {
	console.log(port);
});

Porty.get(function (port) {
	console.log(port);
});
