var express = require('express');
var app = express();

const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

const cors = require('cors')
// import lobby from './type/lobby'

app.use(cors)

app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});

io.on('connection', () => {
  SocketIO.emit('hello', { hello: 'world' })

  SocketIO.on('userLogin', (data) => {
      console.log(data)
  })
})
