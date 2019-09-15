
class Room {
    constructor (room, socketnamespace) {
        Object.assign(this, room)
        socketnamespace.on('connection', onConnection)
    }

    DestroyRoom () {

    }

    onConnection(socket) {
        socket.on('leave', onLeave)
        socket.on('shoot', onShoot)
    }

    onLeave (data) {

    }
    onShoot (data) {

    }
}

export default Room
