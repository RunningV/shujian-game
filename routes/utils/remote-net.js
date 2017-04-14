var net = require('net');

var server = new net.Socket({
  allowHalfOpen: true,
  readable: true,
  writable: true
});
server.connect(5555, '123.206.188.205', function() {
  console.log('connect success !')
  server.write('n\n');
})

server.on('data', function(msg) {
	
})