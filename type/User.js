class User {
    constructor (user) {
        Object.assign(this, user)
        this.isready = false
        this.isdisconnected = false
    }

    get isDisconnected () {
        return this.isdisconnected
    }

    set isDisconnected (isdisconnected) {
        this.isdisconnected = isdisconnected
    }

    get isReady () {
        return this.isready
    }

    set isReady (isready) {
        this.isready = isready
    }

    RefreshStoneState (movedata) {
        //TODO movedata not defined
    }
}

module.exports = User
