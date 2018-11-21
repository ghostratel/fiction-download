const mongoose = require("mongoose");
const chalk = require('chalk')
const {MongoDBURL, DBname, DBUsername, DBPassword} = require("./config.js");
const connect = Symbol("connect");
const __initNovelSchema = Symbol('__initNovelSchema')

class DB {
    constructor() {
        mongoose.set('useCreateIndex', true);
        this[connect]();
        this[__initNovelSchema]();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DB();
        }
        return this.instance;
    }

    // 链接数据库
    [connect]() {
        mongoose.connect(
            MongoDBURL + DBname,
            {user: DBUsername, pass: DBPassword, useNewUrlParser: true}
        )
        console.log(chalk.green('数据库链接成功'))
    }

    // 数据建模
    [__initNovelSchema]() {
        this.NovelSchema = mongoose.Schema({
            title: {type: String, trim: true, required: true}, //小说标题
            author: {type: String, trim: true, required: true}, //小说作者
            novelID: {type: String, trim: true, required: true, unique: true},//小说ID
            novelCover: {type: String, trim: true, required: true},//小说封面图
            summary: {type: String, trim: true, required: true},// 小说简介
            categories: {type: Array, required: true}, // 小说分类ID
            downloadLink: {type: String, trim: true, required: true}, // 小说下载链接
            cateName: {type: Array, required: true}, // 小说分类名
            status: {type: String, required: true}, // 小说连载状态
            lastUpdate: {type: Object}, // 小说上次更新信息
            size: {type: String, required: true}, // 小说大小
            dailyDownload: {type: Number}, // 小说日下载数
            monthlyDownload: {type: Number}, //小说月下载数
            totalDownload: {type: Number}, //小说总下载数
        })
        this.NovelModel = mongoose.model(
            "novels",
            this.NovelSchema,
            "novels"
        )
        // 如果novelID不是索引则将其创建为唯一索引
        this.NovelModel.listIndexes().then(indexes => {
            for (let index of indexes) {
                if (!'novelID' in index.key) {
                    this.NovelSchema.index({'novelID': 1}, {unique: true})
                }
            }
        })
    }


    find(query = {}, options) {
        return new Promise((resolve, reject) => {
            this.NovelModel.find(query, options, (err, docs) => {
                err ? reject(err) : resolve(docs);
            });
        });
    }

    findOne(query = {}, options) {
        return new Promise((resolve, reject) => {
            this.NovelModel.findOne(query, options, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
        });
    }

    // 将对象转换为document
    createDoc(doc) {
        return new this.NovelModel(doc)
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
