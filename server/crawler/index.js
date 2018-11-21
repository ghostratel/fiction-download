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
                novel.cateName = [cateName]
                db.insertOne(novel)
                    .catch(err => {
                        db.findOne({novelID: novel.novelID}).then(doc => {
                            if (doc.categories.indexOf(novel.categories[0]) === -1) {
                                db.updateOne({novelID: novel.novelID},
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

    }

}()