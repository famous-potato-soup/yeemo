
class Room {
    constructor (room, socketnamespace, lobby) {
        Object.assign(this, room)
        socketnamespace.on('connection', onConnection)
        this.lobby = lobby
        this.userList = {}
    }

    DestroyRoom () {

    }

    get UserArray () {
        return Object.values(this.userList)
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
        const userdata = lobby.getUserData(socket.id)

        socket.on('ready', (data) => {

        })
        socket.on('leave', (data) => {
            
        })
        socket.on('shoot', (data) => {
            
        })
        socket.on('exit', (data) => {

        })
        socket.on('disconnect', (data) => {

        })

        this.AddUser({
            userData: userdata,
            socket: socket
        }, socket.id)
    }
    onLeave (data) {

    }
    onShoot (data) {

    }
    onDisconnect (data) {
        
    }
}

export default Room
