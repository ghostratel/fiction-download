const Crawler = require('./Crawler.js')
const chalk = require('chalk')
const DB = require('../modules/DB.js')
const categories = require('./categories.js')

const EventBus = require('../modules/EventBus.js')

const eventBus = EventBus.getInstance()

const db = DB.getInstance()
const crawler = new Crawler()


;!async function () {
    for (let category of categories) {
        let {cateID, cateName, startPage} = category
        console.log(chalk.green(`开始爬取${cateName}分类下所有小说！`))

        eventBus.on('pageDone', (novels) => {
            for (let novel of novels) {
                novel.cateName = cateName
                db.insertOne(novel)
                    .catch(err => {console.log(chalk.blue(`${novel.title}已存在于数据库中!`))})
            }
            console.log(chalk.green('本页数据存储完毕!'))
        })

        await crawler.getCateItems(cateID, startPage)

        console.log(chalk.green(`${cateName}分类下所有小说爬取完毕！`))

    }

}()