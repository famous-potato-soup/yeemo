var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const gameRoom = {//{{{
    "id": "uuid_strings", // uuid string, same as unique url
    "status": "started", // enum value, [waiting, started, done]
    "mode": { // judge win or loose, judging in backend
        "id": 1,
        "size": 2, // for player limit
        "name": "classic push stone - 1vs 1",
        "isTurn": false, // turn base, e.g. my turn -> your turn -> my turn, false mean is realtime 
        "turnLimit": 3000, // turn limit time, 0 is unlimit
        "actionDuration": 500, // time limit for after action
        "moveLimit": 0, // move limit per game, 0 is unlimit
        "winningCondiotion": function(tile, me, others) {
        }
    },
    "user": {
        "player": [
            {
                "id": "uuid",
                "name": "nameeee",
                "weight": 0, // play order, highest weight move first
                "stones":[
                    {
                        "id": "uuid",
                        "isAlive": false,
                        "position": {
                            "lat": 3.3,
                            "lon": 3.3
                        }
                    }
                ]
            }
        ]
    },
    "tile": {
        "width": 1000,
        "height": 1000
    },
    // events(push, crush), join, leave.... per game room
    "history": [
    ]
}//}}}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('someone connect');
    io.emit('hello', 'jazzzz');

  socket.on('userLogin', function(msg){
  });

  socket.on('gameStart', function(msg){
      console.log(msg);
    io.emit('join', Room); 
      {
          id : "새로 접속해야 할 namespace",
      }
  });

  // room 
  socket.emit('새로 접속해야 할 namespace', { // 맨 처음 한번 받을거...
      "id": "String",
      "status": "enum 값인데.... waiting, playing, done",
  })
    // 게임 시작시 쏴줄 데이터
    {
    }


  // 게임중일때
  socket.on('shoot', { // 맨 처음 한번 받을거...
      socket.emit('shoot', data); // 누가 쏴서, 어디로 움직이는지 같이 랜더링 하려고
  });
  socket.on('moveEnd', { // 맨 처음 한번 받을거...
      socket.emit('moveEnd', data); // 누가 쏴서, 어디로 움직이는지 같이 랜더링 하려고
      {
          tile,
          player: [ // isDisconnected
              stones: [],// 돌들 위치
          ],// 돌들 위치
          isGameFinished: Boolean,
          gameResult: { // undefinable
              "winner": <Player_id>
          }
      }
      socket.emit('canShoot', { //이거 받아야 클라이언트에서 내가 돌 쏠 수 있음 
      });
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
console.log(gameRoom);
