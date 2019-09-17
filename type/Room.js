
const GameRoomDef = require('./Definitions/GameRoomDef')
const RoomStatus = GameRoomDef.RoomStatus

class Room {
    constructor (room, socketnamespace, lobby) {
        Object.assign(this, room)
        socketnamespace.on('connection', onConnection)
        this.lobby = lobby
        this.userList = {}
        this.status = RoomStatus.waiting
    }

    DestroyRoom () {

    }

    get Type () {
        return this.roomType
    }

    get UserArray () {
        return Object.values(this.userList)
    }

    get UserLength () {
        return Object.keys(this.userList).length
    }
    
    get Status () {
        return this.status
    }

    FindUserById (id) {
        return this.UserArray.find(u => {
            return u.id === id
        })
    }
    FindUserBySocket (socketid) {
        return this.UserArray[socketid]
    }
    AddUser (user, socketid) {
        this.userList[socketid] = user
    }

    onConnection(socket) {
        socket.on('cert', (data) => {
            const userdata = lobby.getUserData(data.id)
            
            socket.on('ready', (data) => {
            })
            socket.on('leave', (data) => {
                socketnamespace.broadcast('moveEnd', userdata)
            })
            socket.on('moveEnd', (data) => {
                socketnamespace.broadcast('quit', userdata)
            })
            socket.on('shoot', (data) => {
                socketnamespace.broadcast('shoot', data)
                setTimeout(() => {
                    socket.emit('canShoot', {})
                }, GameRoomDef.BaseGameRule.TIME_FOR_TURN)
            })
            socket.on('exit', (data) => {

            })
            socket.on('disconnect', (data) => {
                userdata.isDisconnected = true
            })

            this.AddUser({
                userData: userdata,
                socket: socket
            }, socket.id)
        })
    }
    onLeave (data) {

    }
    onShoot (data) {

    }
    onDisconnect (data) {
        
    }
}

module.exports = Room
