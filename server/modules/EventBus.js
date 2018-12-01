const EventEmitter = require('events')

class EventBus extends EventEmitter{
    static getInstance(){
        if(!this.instance) {
            this.instance = new EventBus()
        }
        return this.instance
    }
    constructor(){
        super()
    }
}

module.exports = EventBus.getInstance()
