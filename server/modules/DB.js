const {MongoClient, ObjectID} = require('mongodb')
const {MongoDBURL, DBname} = require('./config.js')
const EventEmitter = require('events')
const connect = Symbol('connect')

class DB extends EventEmitter {
    constructor() {
        super()

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DB()
        }
        return this.instance
    }

    static createObjectID(id){
        return new ObjectID(id)
    }

    [connect](){
        return new Promise((resolve, reject) => {
            if(!this.db) {
                MongoClient.connect(MongoDBURL, {useNewUrlParser: true}, (err, client) => {
                    if (err) {
                        reject(err)
                    }
                    this.client = client
                    this.db = this.client.db(DBname)
                    this.emit('connect')
                    resolve(this.db)
                })
            } else {
                resolve(this.db)
            }
        })
    }

    find(query = {}, options) {
        return new Promise((resolve, reject) => {
            this[connect]()
                .then(() => {
                this.db.collection('userinfo').find(query, options, (err, cursor) => {
                    if(err) {reject(err)}
                    resolve(cursor.toArray())
                })
            })
                .catch(err => {
                reject(err)
            })
        })
    }

    insertOne(collectionName, doc){
        return new Promise((resolve, reject) => {
            this[connect]()
                .then(() => {
                this.db.collection(collectionName).insertOne(doc, (err, result) => {
                    if(err) {reject(err)}
                    resolve(result)
                })
            })
                .catch(err => {
                    reject(err)
                })

        })
    }

    updateOne(collectionName, query, update) {
        return new Promise((resolve, reject) => {
            this[connect]()
                .then(() => {
                    this.db.collection(collectionName).updateOne(query, update, (err, result) => {
                        if(err) {reject(err)}
                        resolve(result)
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    deleteOne(collectionName, query){
        return new Promise((resolve, reject) => {
            this[connect]()
                .then(() => {
                    this.db.collection(collectionName).deleteOne(query, (err, result) => {
                        if(err) {reject(err)}
                        resolve(result)
                    })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    close() {
        return new Promise(resolve => {
            this.client.close(resolve)
            this.emit('close')
        })
    }
}


exports.DB = DB