'use strict';

const Net = require('net');

const Porty = {};

Porty.HOST = '0.0.0.0';
Porty.MAX = 100000;
Porty.MIN = 8000;

Porty.test = async function (port) {
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

		server.listen(port, Porty.HOST);
	});
};

Porty.find = async function (options) {
	options = options || {};

	if (!options.avoids) options.avoids = [];
	if (!options.min) options.min = Porty.MIN;
	if (!options.max) options.max = Porty.MAX;
	if (!options.port) options.port = options.min;

	if (options.min > options.max) {
		throw new Error('port min is greater than port max');
	} else if (options.avoids.indexOf(options.port) !== -1) {
		options.port++;
		return await Porty.find(options);
	} else {
		const available = await Porty.test(options.port);

		if (available) {
			return options.port;
		} else {
			options.port++;
			return await Porty.find(options);
		}
	}
};

Porty.get = Porty.find;

module.exports = Porty;
