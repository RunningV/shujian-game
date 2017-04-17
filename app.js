var net = require('net');
var convert = require('buffer-encoding').convert

var debug = require('debug')('shujianapp:server');
var http = require('http');
var port = process.env.PORT || 3000;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server = new net.Socket({
  allowHalfOpen: true,
  readable: true,
  writable: true
});

var loginData = null;

io.on('connection', function(socket) {
	socket.on('login', function(data) {
		console.log(data);
		loginData = data;
		server.connect(5555, '123.206.188.205', function() {
		  console.log('connect success !')
		  server.write('n\n');
		})
	});
  socket.on('order', function(data) {
    server.write(data);
    server.write('\n');
  });
  socket.on('logout', function() {
    server.write('quit');
    server.write('\n');
    io.close();
  })
})

server.on('data', function(buffer) {
	var buf = convert(buffer, 'utf8', 'gb2312');
	var buf2Str = buf.toString()//.replace(/(\s+|\n)/gm, 'BLANK');
  console.log(buf2Str)
	if(buf2Str.match('英文名字')) {
		console.log('输入英文ID')
		server.write(loginData.id)
		server.write('\n')
	} else if (buf2Str.match('识别密码')) {
    console.log('密码(passwd)')
    server.write(loginData.pwd)
    server.write('\n')
	} /*else if(buf2Str.match('《书剑·2012》已处在开放阶段')) {
    console.log('登录成功')
    io.emit('success', buf2Str);
  } */else {
    io.emit('success', buf2Str);
  }

})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

require('./routes/router')(app, express, path);

http.listen(port);
http.on('error', onError);
http.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}