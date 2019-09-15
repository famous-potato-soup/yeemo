import express from 'express'
const app = express();

import http from 'http'
const server = http.createServer(app)

import socketio from 'socket.io'
const io = socketio(server)

import cors from 'cors'
import lobby from './type/Lobby'

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
