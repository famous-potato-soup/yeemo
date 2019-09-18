
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
    RemoveUser (socketid) {
        this.userList[socketid] = undefined
    }

    onConnection(socket) {
        socket.on('cert', (data) => {
            const userdata = lobby.getUserData(data.id)
            
            socket.on('ready', (data) => {
                userdata.isReady = true
                if(this.UserArray.filter(e => {
                    return e.isReady
                }) === this.UserLength){
                    this.status = RoomStatus.playing
                }

                this.UserArray.forEach(e => {
                    e.stones = []
                    e.stones.push({
                        x: 10,
                        y: 10
                    })
                    socket.emit('gameStart', {})
                    setTimeout(() => {
                        socket.emit('canShoot', {})
                    }, GameRoomDef.BaseGameRule.TIME_FOR_TURN)
                })
            })
            socket.on('leave', (data) => {
                socketnamespace.broadcast('quit', userdata)
            })
            socket.on('moveEnd', (data) => {
                socketnamespace.broadcast('moveEnd', userdata)
            })
            socket.on('shoot', (data) => {
                socketnamespace.broadcast('shoot', data)
                setTimeout(() => {
                    socket.emit('canShoot', {})
                }, GameRoomDef.BaseGameRule.TIME_FOR_TURN)
            })
            socket.on('exit', (data) => {
                if(this.status !== RoomStatus.playing){
                    this.RemoveUser(socket.id)
                }
            })
            socket.on('disconnect', () => {
                if(this.status === RoomStatus.playing){
                    userdata.isDisconnected = true
                } else {
                    this.RemoveUser(socket.id)
                }
            })

            this.AddUser({
                userData: userdata,
                socket: socket
            }, socket.id)
        })
    }
}

module.exports = Room
