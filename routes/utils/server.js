var net = require('net');
var convert = require('buffer-encoding').convert
var io = require('socket.io')();

var server = new net.Socket({
  allowHalfOpen: true,
  readable: true,
  writable: true
});

io.on('connection', function(socket) {
	socket.on('create', function(data) {
		console.log(data);

		server.connect(5555, '123.206.188.205', function() {
		  console.log('connect success !')
		  server.write('n\n');
		})
	})
})

server.on('data', function(buffer) {
	var buf = convert(buffer, 'utf8', 'gb2312');
	var buf2Str = buf.toString();
	console.log(buf2Str);
	io.emit('hello', buf2Str);
})
