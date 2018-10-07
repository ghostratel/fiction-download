const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'

const sleep = (timer) => {
    return new Promise(resolve => {
        setTimeout(resolve, timer)
    })
}

const puppeteer = require('puppeteer')

;!async function () {
    console.log('开始爬取')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, {waitUntil: 'networkidle2'})
    await page.waitForSelector('.more')
    for(var i = 0 ; i <= 1; i++) {
        await sleep(5000)
        await page.click('.more')
    }
    const result = await page.evaluate(() => {
        var result = []
        var items = document.querySelectorAll('.list-wp .list a.item')
        Array.prototype.forEach.call(items, function (item, index) {
            var poster = item.querySelector('.cover-wp img').src.replace('s_ratio_poster', 'l_ratio_poster')
            // var title = item.querySelector('p').innerText
            var title = item.querySelector('p').innerText.match((/([\u4e00-\u9fa5a-zA-Z]+\(?\d?\：?\·?[\u4e00-\u9fa5a-zA-Z]*\)?)/g)).join('')
            var score = item.querySelector('p strong').innerText
            var DoubanID = item.querySelector('.cover-wp').getAttribute('data-id')
            result.push({
                poster,
                title,
                score,
                DoubanID
            })
        })
        return result
    })
    browser.close()

    process.send(result)
    process.exit(0)
}()