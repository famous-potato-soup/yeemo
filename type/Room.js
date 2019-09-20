
const GameRoomDef = require('./Definitions/GameRoomDef')
const RoomStatus = GameRoomDef.RoomStatus

class Room {
    constructor (room, socketnamespace, lobby) {
        Object.assign(this, room)
        socketnamespace.on('connection', (socket) => {
            this.onConnection(socket)
        })
        this.socketnamespace = socketnamespace
        this.lobby = lobby
        this.userList = {}
        this.status = RoomStatus.waiting
        this.rule = GameRoomDef.GameRule[this.roomType]
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
        delete this.userList[socketid];
        if(this.UserLength === 0 ) {
            this.lobby.RoomRemove(this)
        }
    }

    onConnection(socket) {
        console.log('socket joined room', socket.id)
        const userdata = this.lobby.getUserData(socket.id.split('#')[1])
        if(userdata === undefined) {
            return
        }
        socket.emit('roomjoined')

        socket.on('leave', (data) => {
            this.socketnamespace.emit('quit', userdata)
        })
        socket.on('moveEnd', (data) => {
            this.socketnamespace.emit('moveEnd', userdata)
            
            const liveUser = this.UserList.filter(e => {
                return e.stones.length > 0
            })
            if(liveUser.length == 1){
                this.socketnamespace.emit('gamefinished', {
                    winner: liveUser[0].userid,
                })
                this.status = RoomStatus.done
            } else if(liveUser.length == 0){
                this.socketnamespace.emit('gamefinished', {
                    winner: 'draw',
                })
                this.status = RoomStatus.done
            }
//            setTimeout(() => {
//                socket.emit('canShoot', {})
//            }, this.rule.TIME_FOR_TURN)
        })
        socket.on('shoot', (data) => {
            this.socketnamespace.emit('shoot', data)
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

        if(this.UserLength == 1){
            this.lobby.setRoomWorking(this)
        }
        if(this.UserLength == this.rule.MAX_PLAYER){
            this.status = RoomStatus.playing
            const senddata = {}
            senddata.roomtype = this.Type
            senddata.user = this.UserArray.map(e => {
                e.userData.stones = []
                e.userData.stones.push({
                    x: Math.random() * 1400+ 50,
                    y: Math.random() * 1400+ 50
                })
                return {
                    email: e.userData.email,
                    name: e.userData.name,
                    stones: e.userData.stones,
                    picture: e.userData.picture,
                }
            })

            this.socketnamespace.emit('gameReady', senddata)
            setTimeout(() => {
                this.socketnamespace.emit('canShoot', {})
            }, this.rule.TIME_FOR_TURN)
        }
    }
}

module.exports = Room
