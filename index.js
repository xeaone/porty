const Net = require('net');

const HOST = '0.0.0.0';
const MAX = 20000;
const MIN = 8000;

/*
	getAvailablePort accepts a single number port and ports array
	if the port is exists in the ports then one is added to ports and tested
	else if the port or the new port does not exists in the ports it returns false
*/
function getAvailablePort (port, ports) {
	var portExists = true;

	if (ports) ports.sort(sortNumber);
	else return port;

	while (portExists === true){
		portExists = exists(port, ports);
		if (portExists) port++;
	}

	return port;

	function sortNumber(a, b) {
		return a - b;
	}

	function exists (item, items) {
		var l = items.length;
		var f = l - 1;
		var i = 0;

		var itemFirst = items[0];
		var itemFinal = items[f];

		if (item < itemFirst) return false;
		if (item > itemFinal) return false;

		for (i; i < l; i++) {
			if (items[i] === item) return true;
			else if (i === f) return false;
		}
	}
}

function attempt (portMin, portMax, portsAvoid, callback) {
	const server = Net.createServer();

	var port = (portsAvoid) ? getAvailablePort(portMin, portsAvoid) : portMin;

	server.unref();
	server.listen(port, HOST);

	server.once('error', function() {
		server.close(function () {
			if (portMin > portMax) return callback();
			port++;
			attempt(port, portMax, callback, portsAvoid);
		});
	});

	server.once('listening', function() {
		server.close(function () {
			return callback(port);
		});
	});
}

/*
	all params are optional
*/
exports.get = function (portMin, portMax, portsAvoid, callback) {
	if (typeof portMin === 'function') {
		callback = portMin; portMax = MAX; portMin = MIN; portsAvoid = null;
	} // Function
	else if (typeof portMax === 'function' && typeof portMin === 'number') {
		callback = portMax; portMax = MAX; portsAvoid = null;
	} // Number, Function
	else if (typeof portMax === 'function' && typeof portMin === 'object') {
		callback = portMax; portsAvoid = portMin; portMin = MIN; portMax = MAX;
	} // Array, Function
	else if (typeof portMax === 'object') {
		callback = portsAvoid; portsAvoid = portMax; portMax = MAX;
	} // Number, Array, Function
	else if (typeof portsAvoid === 'function') {
		callback = portsAvoid; portsAvoid = null;
	} // Number, Number, Function

	attempt(portMin, portMax, portsAvoid, function (port) {
		return callback(port);
	});
};
