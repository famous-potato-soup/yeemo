
const Room = require('./Room')
const GameRoomDef = require('./Definitions/GameRoomDef')

class Lobby {
    constructor (options) {
        this.socketio = options.socketio

        this.preparedRooms = []
        this.rooms = []
        this.users = {}
    }

    get Users () {
        return this.users
    }
    get UserArray () {
        return Object.values(this.users)
    }

    get Rooms () {
        return this.rooms
    }

    get PreparedRooms () {
        return this.preparedRooms
    }

    UserConnect (socket) {
        console.log('some one connect')
        socket.emit('hello', {hello: 'world'})

        socket.on('userLogin', (data) => {
            //fb auth need
            socket.on('gameStart', (data) => {
                let roomtype = data.type || 'default type'
                let room = this.FindPlaybleRoom(roomtype)
                socket.emit('room', {
                    id: room.Id,
                    status: room.Status
                })
            })
        })
    }

    AddPreparedRoom (room) {
        this.preparedRooms.push(room)
    }
    
    SetRoomWorking (room) {
        this.preparedRooms.filter(e => {
            return e !== room
        })
        this.rooms.push(room)
    }

    RoomRemove (room) {
        this.rooms.filter(e => {
            return e !== room
        })
    }

    FindPlaybleRoom (type) {
        const roomlist = this.rooms.filter(e=> {
            return e.Type === type && e.Status === GameRoomDef.RoomStatus.waiting
        })

        if(roomlist.length === 0) {
            return new Room({
                gamerule: GameRoomDef.BaseGameRule,
                roomType: type,
            })
        } else {

        }
    }

    FindRoom (roomid) {
        return this.rooms.find(e => {
            return e.id === roomid
        })
    }
}

module.exports = Lobby
