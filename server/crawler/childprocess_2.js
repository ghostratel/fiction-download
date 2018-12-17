const Crawler = require('./Crawler.js')
const categories = require('./categories.js')
const chalk = require('chalk')
const crawler = new Crawler()
;!async function(){
    for(let i = 1; i < categories.length; i+=2) {
        let {cateID, cateName} = categories[i]
        console.log(chalk.green(`开始爬取${cateName}分类下所有小说！`))
        await crawler.getCateContent(cateID)
    }
}()
