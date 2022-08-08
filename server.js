var port = 8000,
	WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({ port: port });

let clients = new Set();


console.log('listening on port: ' + port);

wss.on('connection', function connection(ws) {
	clients.add(ws);
	ws.on('message', function(message) {

		console.log('message: ' + message);
		// ws.send(message);

		for(let client of clients) {
			client.send(message);
		}
	});

	console.log('new client connected!');
	// ws.send('connected!');

});