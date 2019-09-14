const ioFunction = {
  "room/create": function(data) {
    const player = {
      "id": `uuid_${data.name}`,
      "name": data.name,
      "won": 0,
      "loose": 0,
      "weight": 0, // play order, highest weight move first
      "stones":[]
    }

    return {
      "player": player,
      "room": {
        "id": "uuid_strings", // uuid string, same as unique url
        "status": "started", // enum value, [waiting, started, done]
        "mode": { // judge win or loose, judging in backend
          "id": 1,
          "size": 2, // for player limit
          "name": "classic push stone - 1vs 1",
          "isTurn": true, // turn base, e.g. my turn -> your turn -> my turn, false mean is realtime 
          "turnLimit": 3000, // turn limit time, 0 is unlimit
          "actionDuration": 0, // time limit for after action
          "moveLimit": 0, // move limit per game, 0 is unlimit
        },
        "user": {
          "player": [player],
          "observer": []
        },
        "tile": {
          "width": 1000,
          "height": 1000
        }
        // events(push, crush), join, leave.... per game room
        "history": []
      }
    }
  },

  "room/leave": function(data) {
  }
}

export default ioFunction
