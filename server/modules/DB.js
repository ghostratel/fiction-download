const mongoose = require("mongoose");
const chalk = require('chalk')
const {MongoDBURL, DBname, DBUsername, DBPassword} = require("./config.js");
const connect = Symbol("connect");
const __initNovelSchema = Symbol('__initNovelSchema')

class DB {
    constructor() {
        this[connect]();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DB();
        }
        return this.instance;
    }

    [connect]() {
        mongoose.connect(
            MongoDBURL + DBname,
            {user: DBUsername, pass: DBPassword, useNewUrlParser: true}
        )
        console.log(chalk.green('数据库链接成功'))
        this[__initNovelSchema]()
    }


    [__initNovelSchema]() {
        this.NovelSchema = mongoose.Schema({
            title: {type: String, trim: true, required: true},
            author: {type: String, trim: true, required: true},
            novelID: {type: String, trim: true, required: true},
            novelCover: {type: String, trim: true, required: true},
            summary: {type: String, trim: true, required: true},
            type: {type: String, trim: true, required: true},
            downloadLink: {type: String, trim: true, required: true},
            cateName: {type: String, trim: true, required: true}
        });
        this.NovelModel = mongoose.model(
            "novels",
            this.NovelSchema,
            "novels"
        );
        this.NovelModel.createIndexes({novelID: {unique: true}})
    }

    find(query = {}, options) {
        return new Promise((resolve, reject) => {
            this.NovelModel.find(query, options, (err, docs) => {
                err ? reject(err) : resolve(docs);
            });
        });
    }

    insertOne(doc) {
        return new this.NovelModel(doc).save();
    }

    updateOne(query, update) {
        return new Promise((resolve, reject) => {
            this.NovelModel.updateOne(query, update, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    deleteOne(query) {
        return new Promise((resolve, reject) => {
            this.NovelModel.deleteOne(query, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    }

    close() {
        return new Promise(async resolve => {
            resolve(await mongoose.disconnect())
            console.log(chalk.green('数据库链接关闭!'))
        });
    }
}

module.exports = DB;
