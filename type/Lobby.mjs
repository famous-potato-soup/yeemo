class Lobby {
    constructor (lobby) {
        this.preparedRooms = []
        this.rooms = []
        this.users = []
    }

    get Users () {
        return this.users
    }

    get Rooms () {
        return this.rooms
    }

    get PreparedRooms () {
        return this.preparedRooms
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
}

export default Lobby
