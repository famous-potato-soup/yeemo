const express = require('express')
const app = express();

const http = require('http')
const server = http.Server(app)

const socketio = require('socket.io')
const io = socketio(server)

const cors = require('cors')
const Lobby = require('./type/Lobby')
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Hello World!');
})


const lobby = new Lobby({
  socket: io
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

server.listen(3001, () => {
        console.log('server open without error')
})

