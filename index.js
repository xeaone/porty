const Net = require('net');
const Porty = {};

Porty.HOST = '0.0.0.0';
Porty.MAX = 100000;
Porty.MIN = 8000;

// test for open port
Porty.test = function (port) {
	const self = this;

	return new Promise(function (resolve) {
		const server = Net.createServer();

		server.unref();

		server.once('error', function () {
			server.close(function () {
				return resolve(false);
			});
		});

		server.once('listening', function () {
			server.close(function () {
				return resolve(true);
			});
		});

		server.listen(port, self.HOST);
	});
};

// find open port
Porty.find = function (options) {
	const self = this;

	options = options || {};

	if (!options.avoids) options.avoids = [];
	if (!options.min) options.min = self.MIN;
	if (!options.max) options.max = self.MAX;
	if (!options.port) options.port = options.min;

	if (options.min > options.max) {
		return Promise.reject(new Error('port min is greater than port max'));
	} else if (options.avoids.indexOf(options.port) !== -1) {
		options.port++;
		return self.find(options);
	} else {
		return self.test(options.port).then(function (available) {
			if (available) {
				return Promise.resolve(options.port);
			} else {
				options.port++;
				return self.find(options);
			}
		}).catch(function (error) {
			return Promise.reject(error);
		});
	}
};

Porty.get = Porty.find;

module.exports = Porty;
