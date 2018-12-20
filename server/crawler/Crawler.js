const chalk = require('chalk')
const puppeteer = require('puppeteer')
const eventBus = require('../modules/EventBus.js')
const { NovelModel, ChapterModel, insertOne } = require('../modules/DB.js')
const __init = Symbol('__init')
const __genPageData = Symbol('__genPageData')
class Crawler {
    constructor() {
        this.browser = null
        this.page = null
    }

    async [__init]() {
        this.browser = await puppeteer.launch()
        this.page = await this.browser.newPage()
    }

    /**
     * 获取小说所有分类信息
     * @returns {Promise<void>}
     */
    async getAllCate() {
        await this[__init]()
        const indexURL = 'https://www.80txt.com/'
        await this.page.goto(indexURL)
        await this.page.waitFor('div#nav')
        return await this.page.$$eval('div#menu ul li a', function (elements) {
            const result = []
            elements.forEach(function (element) {
                const nav = {}
                nav.cateName = element.title
                nav.cateID = element.href.match(/\/sort\w+\//)[0].replace(/\//g, '')
                result.push(nav)
            })
            return result
        })
    }

    /**
     * 爬取该分类下所有小说
     * @param cateID 分类id
     * @param startPage 开始页码
     * @returns {Promise<*>}
     */
    async getCateItems(cateID, startPage = 1) {
        !this.browser && await this[__init]()
        return new Promise(async resolve => {
            await this.page.goto(`https://www.80txt.com/${cateID}/${startPage}.html`)
            const pageCount = await this.page.$eval('a.last', (element) => {
                return +element.innerText
            })
                ; (async () => {
                    for (; startPage <= pageCount; startPage++) {
                        console.log(chalk.green(`开始爬取第${startPage}页数据! ------- ${startPage}/${pageCount} -------`))

                        let _novelList = await this[__genPageData](cateID, startPage)

                        console.log(chalk.green(`第${startPage}页数据爬取完毕! ------- ${startPage}/${pageCount} -------`))

                        // 当爬取完一页时派发一个pageDone事件，将当前页面爬取到的数据随事件派发出去
                        eventBus.emit('pageDone', _novelList)
                    }
                    resolve(1)
                })()
        })
    }

    /**
     * 爬取该分类下所有小说的章节及内容(这个方法直接从数据库里拿小说信息)
     * @param cateID 分类id
     * @returns {Promise<void>}
     */
    async getCateContent(cateID) {
        !this.browser && await this[__init]()
        return new Promise((resolve, reject) => {
            NovelModel.find({ categories: { $all: [cateID] } }).then(async docs => {
                if (!docs.length) {
                    resolve()
                }
                for (let doc of docs) {
                    let { novelID } = doc
                    let pageURL = `https://www.80txt.com/txtml_${novelID}.html`
                    await this.page.goto(pageURL)
                    // 当该小说下没有小说章节字段时，爬取该字段并爬取每章节的内容
                    console.log(chalk.green(`开始爬取《${doc.title}》章节`))
                    const chapterList = await this.page.$$eval('#yulan li a', elements => {
                        const result = []
                        for (let element of elements) {
                            let chapter = {}
                            chapter.chapterTitle = element.innerText
                            chapter.chapterID = element.href.match(/\d+\/\d+/)[0]
                            result.push(chapter)
                        }
                        return result
                    })
                    //  当小说没有chapterList字段或chapterList字段为空或chapterList长度与爬取到的章节长度不相等时，执行更新该小说                                     //  chapterList字段的逻辑 更新完成chapterList字段后开始爬取章节内容
                    if (chapterList.length && (!doc.chapters || !doc.chapters.length || chapterList.length !== doc.chapters.length)) {
                        let res = await NovelModel.updateOne({ novelID: doc.novelID }, { chapters: chapterList })
                        if (res.ok === 1) {
                            // 此处需注意。这里的doc是在更新文档之前从数据库中拿到的，这里的数据库更新操作是更新数据库中的文档，所以之前
                            // 从数据库中拿到的doc并不会更新。所以需要手动赋下值。
                            doc.chapters = chapterList
                            console.log(chalk.blue(`《${doc.title}》章节信息更新成功!`))
                            await this.getAllChaptersContent(doc)
                        }
                    } else {
                        // else分支 说明小说chapterList字段有章节信息，并且是最新的。直接爬取章节内容
                        await this.getAllChaptersContent(doc)
                    }
                }
            })
        })
    }

    /**
     * 根据章节ID获取章节内容
     * @param chapterID
     * @returns {Promise<void>}
     */
    async getChapterContent(chapterID) {
        !this.browser && await this[__init]()
        return new Promise((resolve, reject) => {
            ChapterModel.findOne({ chapterID }).then(async doc => {
                // 如果小说内容已存在数据库中直接reject
                if (doc) {
                    resolve(doc)
                } else {
                    let pageURL = `http://www.qiushu.cc/t/${chapterID}.html`
                    await this.page.goto(pageURL)
                    const txt = await this.page.$eval('#content', element => {
                        return element.innerText
                            // 匹配底部推广文案
                            .replace(/txt下.*\d?\/?|手机阅读.*\d?\/|为了.*支持[！!]*|手机用户.*阅读.*体验/gim, '')
                            // 匹配小说中的推广网址
                            .replace(/www.*c(c|n|om)|\w+.*\.c(c|n|om)\/?/gim, '')
                            // 匹配被[]()（）包裹起来的推广文案
                            .replace(/[(（\[].*[棉花求q八]+.*[\])）]|[(（\[].*[棉花求q八]+.*(网|小说)/, '')
                            // 匹配大部分常见的固定推广文案
                            .replace(/无弹窗(广告)?.*好评?|无弹窗(广告)?|无(弹窗)?广告|(求书|棉花糖|八零电子书)(小说)?网?/, '')
                            .trim()
                    })
                    await this.page.waitFor(2000)
                    resolve(txt)
                }
            })
        })
    }

    /**
     * 传入小说document对象，存储该小说所有章节的文字内容
     * @param doc
     * @returns {Promise<any>}
     */
    getAllChaptersContent(doc) {
        console.log(chalk.green(`开始爬取《${doc.title}》所有章节的文字内容。`))
        return new Promise(async (resolve, reject) => {
            for (let chapter of doc.chapters) {
                let chapterDoc = {}
                let chapterContent = await this.getChapterContent(chapter.chapterID)
                if (typeof chapterContent === 'string') {
                    chapterDoc.chapterID = chapter.chapterID
                    chapterDoc.content = chapterContent
                    chapterDoc.title = chapter.chapterTitle
                    chapterDoc.novelTitle = doc.title
                    chapterDoc.novelID = doc.novelID
                    insertOne('ChapterModel', chapterDoc)
                        .then(() => {
                            console.log(chalk.green(`${chapterDoc.title}存储成功`))
                        })
                } else {
                    console.log(chalk.red(`${chapterContent.title}已存在`))
                }
            }
            console.log(chalk.green(`《${doc.title}》所有章节爬取完毕。`))
            resolve(1)
        })

    }

    [__genPageData](cateID, currentPage) {
        return new Promise(async resolve => {
            let pageURL = `https://www.80txt.com/${cateID}/${currentPage}.html`
            await this.page.goto(pageURL)
            await this.page.waitFor(2000)
            let novelList = await this.page.$$eval('#slist #list_art_2013', (elements) => {
                var _novelList = []
                // 通过URL获取当前小说分类
                var novelType = window.location.pathname.match(/^\/(sort\w+)\//)[1]
                elements.forEach(function (element) {
                    var novel = {}
                    novel.summary = element.querySelector('.book_jj').innerText
                    novel.author = element.querySelector('.book_cont a').innerText
                    novel.novelID = element.querySelector('.book_bg a').href.match(/\/(\d+)/)[1]
                    novel.novelCover = element.querySelector('.book_pic img').src
                    novel.title = element.querySelector('.book_pic img').title
                    novel.downloadLink = `https://dz.80txt.com/${novel.novelID}/${novel.title}.zip`
                    novel.categories = [novelType]
                    novel.status = element.querySelector('span.strong').innerText
                    novel.lastUpdate = {}
                    novel.lastUpdate.time = element.querySelector('em.newDate').innerText
                    novel.lastUpdate.chapter = element.querySelector('.book_rg b').innerText
                    novel.size = element.querySelector('.book_cont').innerText.match(/\d+KB/)[0]
                    novel.dailyDownload = +element.querySelector('.book_cont').innerText.match(/今?日下载.?(\d+)/)[1]
                    novel.monthlyDownload = +element.querySelector('.book_cont').innerText.match(/月下载.?(\d+)/)[1]
                    novel.totalDownload = +element.querySelector('.book_cont').innerText.match(/总下载.?(\d+)/)[1]
                    _novelList.push(novel)
                })
                return _novelList
            })
            await this.page.waitFor(1000)
            resolve(novelList)
        })
    }


    async close() {
        await this.browser.close()
    }
}

module.exports = Crawler
