const express = require('express')
const app = express();

const http = require('http')
const server = http.createServer(app)

const socketio = require('socket.io')
const io = socketio(server)

const cors = require('cors')
const Lobby = require('./type/Lobby')

app.use(cors)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const lobby = new Lobby({
  socket: io
})

app.get('/', (req, res) => {
  res.send('Hello World!');
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
  res.render('error')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
