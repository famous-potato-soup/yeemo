const BaseGameRule = {
    MAX_PLAYER: 2,
    TIME_FOR_TURN: 3000,
}

const RoomStatus = {
    waiting: 'waiting',
    playing: 'playing',
    done: 'done'
}

module.exports =  {
    GameRule:{
        basetype: BaseGameRule,
        chamgyrm: BaseGameRule,
        zerogravity: BaseGameRule,
    },
    RoomStatus
}
