const Crawler = require('./Crawler.js')
const chalk = require('chalk')
const db = require('../modules/DB.js')
let categories = require('./categories.js')
const eventBus = require('../modules/EventBus.js')
const crawler = new Crawler()
const argument = process.argv.splice(2)[0]

/**
 * 爬取所有分类的所有小说信息（不包括小说章节及内容）
 * @returns {Promise<void>}
 */
categories = categories.filter(c => !c.done)

const crawlAllNovel = async () => {
    for (let category of categories) {
        let {cateID, cateName, startPage, done} = category
        console.log(chalk.green(`开始爬取${cateName}分类下所有小说！`))

        eventBus.on('pageDone', (novels) => {
            for (let novel of novels) {
                novel.cateName = [cateName]
                db.insertOne('NovelModel',novel)
                    .catch(err => {
                        db.NovelModel.findOne({novelID: novel.novelID}).then(doc => {
                            if (doc.categories.indexOf(novel.categories[0]) === -1) {
                                db.NovelModel.updateOne({novelID: novel.novelID},
                                    {
                                        categories: [...doc.categories, ...novel.categories],
                                        cateName: [...doc.cateName, novel.cateName]
                                    })
                                    .then(() => {
                                        console.log(chalk.blue(`《${doc.title}》已更新！`))
                                    })

                            } else {
                                console.log(chalk.red(`《${doc.title}》已存在！`))
                            }
                        })
                    })
            }
            console.log(chalk.green('本页数据存储完毕!'))
        })
        await crawler.getCateItems(cateID, startPage)
        console.log(chalk.green(`${cateName}分类下所有小说爬取完毕！`))
        eventBus.removeAllListeners()
    }
}

/**
 * 爬取所有小说的章节及内容
 * 知识点：在循环中如果想让异步任务呈队列运行，必须使用async await
 * @returns {Promise<void>}
 */
const crawlAllNovelContent = async () => {
    for (let category of categories) {
        let {cateID, cateName, startPage} = category
        console.log(chalk.green(`开始爬取${cateName}分类下所有小说！`))
        await crawler.getCateContent(cateID, startPage)
    }
}

argument === 'novel' ? crawlAllNovel() : crawlAllNovelContent()


