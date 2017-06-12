const Porty = require('./index.js');

Porty.find({
	min: 8080,
	max: 8090,
	avoids: [8081, 8080, 8082, 8083, 8084]
}).then(function (port) {
	console.log(`1st: ${port}`);
}).catch(function (error) {
	console.log(error);
});

Porty.get().then(function (port) {
	console.log(`2nd: ${port}`);
}).catch(function (error) {
	console.log(error);
});

Porty.find({
	min: 8002,
	max: 8001
}).then(function (port) {
	console.log(`3rd: ${port}`);
}).catch(function (error) {
	console.log(error);
});
