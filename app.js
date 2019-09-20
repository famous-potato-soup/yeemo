const express = require('express')
const app = express();

const http = require('http')
const server = http.Server(app)

const socketio = require('socket.io')
const io = socketio(server)
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const cors = require('cors')
const Lobby = require('./type/Lobby')
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRouter);
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

const port = 3001;
server.listen(port, () => {
    console.log(`${port} is running`)
})

