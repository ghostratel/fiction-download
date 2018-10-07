const childProcess = require('child_process')
const path = require('path')
const url = 'https://movie.douban.com/subject/26985127/'
const puppeteer = require('puppeteer')

const sleep = (timer) => {
        return new Promise(resolve => {
            setTimeout(resolve, timer)
        })
    }

;(async () => {
    console.log('开始爬取预告片')
    const browser = await puppeteer.launch()
    const detailPage = await browser.newPage()

    await detailPage.goto(url, {waitUntil: 'networkidle2'})

    const videoPageUrl = await detailPage.evaluate(() => {
        return document.querySelector('a.related-pic-video').getAttribute('href')
    })
    await detailPage.goto(videoPageUrl, {waitUntil: 'networkidle2'})

    const result = await detailPage.evaluate(() => {
        return document.querySelector('source').getAttribute('src')
    })
    console.log(result)
    console.log('爬取结束')
})()