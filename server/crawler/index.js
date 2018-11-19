const Crawler = require('./Crawler.js')
const chalk = require('chalk')
const DB = require('../modules/DB.js')
const categories = require('./categories.js')
const db = DB.getInstance()
const crawler = new Crawler()


;!async function () {
    for(let category of categories) {
        let {cateID, cateName} = category
        console.log(chalk.green(`开始爬取${cateName}分类下所有小说！`))
        let allNovels = await crawler.getCateItems(cateID)
        console.log(chalk.green(`${cateName}分类下所有小说爬取完毕！`))
        for (let doc of allNovels) {
            doc.cateName = cateName
            await db.insertOne(doc)
        }
        console.log(chalk.green(`${cateName}分类下所有小说存入数据库完毕！`))
    }

}()