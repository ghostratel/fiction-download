const mongoose = require("mongoose")
const { MongoDBURL, DBname, DBUsername, DBPassword } = require("./config.js")
const EventEmitter = require("events")
const connect = Symbol("connect")

class DB extends EventEmitter {
    constructor() {
        super()
        this[connect]()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DB()
        }
        return this.instance
    }

    [connect]() {
        mongoose.connect(
            MongoDBURL + DBname,
            { user: DBUsername, pass: DBPassword, useNewUrlParser: true }
        )
        this.HeroSchema = mongoose.Schema({name: String, age: Number, from: String})
        this.HeroModel = mongoose.model("userinfo", this.HeroSchema, "userinfo")
    }

    find(query = {}, options) {
        return new Promise((resolve, reject) => {
            this.HeroModel.find(query, options, (err, docs) => {
                err ? reject(err) : resolve(docs)
            })
        })
    }

    insertOne(doc) {
        return new this.HeroModel(doc).save()
    }

    updateOne(query, update) {
        return new Promise((resolve, reject) => {
            this.HeroModel.updateOne(query, update, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }

    deleteOne(query) {
        return new Promise((resolve, reject) => {
            this.HeroModel.deleteOne(query, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }

    close() {
        return new Promise(resolve => {
            this.client.close(resolve)
            this.emit("close")
        })
    }
}

module.exports = DB
