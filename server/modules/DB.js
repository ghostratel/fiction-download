const mongoose = require("mongoose");
const chalk = require('chalk')
const {MongoDBURL, DBname, DBUsername, DBPassword} = require("./config.js");
const connect = Symbol("connect");
const __initNovelSchema = Symbol('__initNovelSchema')
const __initChapterSchema = Symbol('__initChapterSchema')
const __initUserSchema = Symbol('__initUserSchema')

class DB {
    constructor() {
        mongoose.set('useCreateIndex', true);
        this.NovelSchema = null
        this.NovelModel = null
        this.ChapterSchema = null
        this.ChapterModel = null
        this[connect]()
        this[__initNovelSchema]()
        this[__initChapterSchema]()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DB()
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
            chapters: {type: Array} //小说的所有章节
        })
        this.NovelModel = mongoose.model(
            "novel",
            this.NovelSchema,
            "novel"
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

    [__initChapterSchema]() {
        this.ChapterSchema = mongoose.Schema({
            chapterID: {type: String, required: true, unique: true},
            content: {type: String, required: true},
            title: {type: String, required: true},
            novelTitle: {type: String, required: true},
            novelID: {type: String, required: true}
        })
        this.ChapterModel = mongoose.model('chapter', this.ChapterSchema, 'chapter')
        // 如果chapterID不是索引则将其创建为唯一索引
        this.ChapterModel.listIndexes().then(indexes => {
            for (let index of indexes) {
                if (!'chapterID' in index.key) {
                    this.ChapterModel.index({'chapterID': 1}, {unique: true})
                }
            }
        })
    }

    [__initUserSchema](){
        this.UserSchema = mongoose.Schema({
            userID: {type: String, required: true, unique: true},
            username: {type: String, required: true, unique: true},
            password: {type: String, required: true},
            roles: {type: String, required: true},
        })
        this.UserModel = mongoose.model('user', this.UserSchema, 'user')

        // 如果userID和username不是索引则将其创建为唯一索引
        this.ChapterModel.listIndexes().then(indexes => {
            for (let index of indexes) {
                if (!'userID' in index.key) {
                    this.ChapterModel.index({'userID': 1}, {unique: true})
                }
                if (!'username' in index.key) {
                    this.ChapterModel.index({'username': 1}, {unique: true})
                }
            }
        })
    }

    // 获取model
    getModel(modelName) {
        return this[modelName]
    }


    // 将对象转换为document
    createDoc(doc) {
        return new this.NovelModel(doc)
    }

    insertOne(modelName, doc) {
        return new this[modelName](doc).save();
    }

    close() {
        return new Promise(async resolve => {
            resolve(await mongoose.disconnect())
            console.log(chalk.green('数据库链接关闭!'))
        });
    }
}

module.exports = DB.getInstance();
