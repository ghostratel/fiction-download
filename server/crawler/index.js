const Crawler = require('./Crawler.js')
const crawler = new Crawler()


;! async function () {
   let result = await crawler.getCateItems('sort3')
    console.log(result)
}()