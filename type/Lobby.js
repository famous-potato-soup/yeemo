
const Room = require('./Room')
const GameRoomDef = require('./Definitions/GameRoomDef')

class Lobby {
    constructor (options) {
        this.socketio = options.socket

        this.preparedRooms = []
        this.rooms = []
        this.users = {}

        this.socketio.on('connection', (socket) => {
            this.UserConnect(socket)
        })
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
        console.log(socket.id)
        socket.emit('hello', {hello: 'world'})

        socket.on('userLogin', (data) => {
            socket.emit('userLogin', {user: 'login'})
            this.users[socket.id] = {
                socket: socket,
                userData: data,
            }
            //fb auth need
            socket.on('gameStart', (data) => {
                let roomtype = (data ? data.type : 'basetype') || 'basetype'
                let room = this.FindPlaybleRoom(roomtype)
                socket.emit('room', {
                    id: room.Id,
                    status: room.Status
                })
            })
        })
        socket.on('disconnect', () => {
            if(this.users[socket.id] !== undefined){
                this.users[socket.id] = undefined
            }
        })
    }

    AddPreparedRoom (room) {
        this.preparedRooms.push(room)
    }
    
    SetRoomWorking (room) {
        console.log('room is no more empty')

        this.preparedRooms.filter(e => {
            return e !== room
        })
        this.rooms.push(room)
    }

    RoomRemove (room) {
        this.preparedRooms.filter(e => {
            return e !== room
        })
        this.rooms.filter(e => {
            return e !== room
        })
    }

    FindPlaybleRoom (type) {
        const roomlist = this.rooms.filter(e=> {
            return e.Type === type && e.Status === GameRoomDef.RoomStatus.waiting
        })

        if(roomlist.length === 0) {
            let roomid = 'fortesting' //TODO randomstring
            const room = new Room({
                    Id: roomid,
                    gamerule: GameRoomDef.BaseGameRule,
                    roomType: type,
                },
                this.socketio.of(roomid),
                {
                    getUserData: (key) => { return this.FindUserByKey(key) },
                    roomDestroy: (room) => { this.RoomRemove(room) },
                    setRoomWorking: (room) => { this.SetRoomWorking(room) },
                }
            )
            this.preparedRooms.push(room)
            return room
        } else {
            return roomlist[0]
        }
    }
    FindUserByKey (key) {
        return this.users[key]? this.users[key].userData : undefined
    }

    FindRoom (roomid) {
        return this.rooms.find(e => {
            return e.id === roomid
        })
    }
}

module.exports = Lobby
