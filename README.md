# Porty
Porty quickly and easily find available ports.

## Example

```JavaScript
Porty.find({
	min: 8080,
	max: 8090,
	avoids: [8080, 8081, 8082, 8083, 8084]
}).then(function (port) {
	console.log(`${port}`); // 8085
}).catch(function (error) {
	throw error;
});
```

## Porty.test(port)
Tests if a port is in use. Returns a boolean.

- Returns `Promise`
- `port: Number` port to test

## Porty.find(options)
Options are optional. Returns a open port.

- Returns `Promise`
- `options: Object`
	- `min: Number` port number to start
	- `max: Number` port number to end
	- `avoids: Array` array of port numbers to avoid

## Porty.get
Alias for Porty.find
