const chalk = require('chalk')
const puppeteer = require('puppeteer')
const __init = Symbol('__init')
const __genPageData = Symbol('__genPageData')

const indexURL = 'https://www.80txt.com/'

class Crawler {
    constructor() {
        this.browser = null
        this.page = null
    }

    async [__init]() {
        this.browser = await puppeteer.launch()
        this.page = await this.browser.newPage()
    }


    async getAllCate() {
        await this[__init]()
        await this.page.goto(indexURL)
        await this.page.waitFor('div#nav')
        return await this.page.$$eval('div#menu ul li a', function (elements) {
            var result = []
            elements.forEach(function (element) {
                var nav = {}
                nav.cateName = element.title
                nav.cateID = element.href.match(/\/sort\w+\//)[0].replace(/\//g, '')
                result.push(nav)
            })
            return result
        })
    }

    async getCateItems(cateID) {
        !this.browser && await this[__init]()

        return new Promise(async (resolve, reject) => {
            let novelList = []
            await this.page.goto(`https://www.80txt.com/${cateID}/1.html`)
            const pageCount = await this.page.$eval('a.last', (element) => {
                return +element.innerText
            })
            ;(async () => {
                for (let currentPage = 1; currentPage <= pageCount; currentPage++) {
                    let _novelList = await this[__genPageData](cateID, currentPage)
                    novelList = [...novelList, ..._novelList]
                    console.log(chalk.green(`第${currentPage}页数据爬取完毕! ------- ${currentPage}/${pageCount} -------`))
                }
                resolve(novelList)
            })()
        })
    }

    [__genPageData](cateID, currentPage) {
        return new Promise(async resolve => {
            let pageURL = `https://www.80txt.com/${cateID}/${currentPage}.html`
            await this.page.goto(pageURL)
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
                    novel.type = novelType
                    _novelList.push(novel)
                })
                return _novelList
            })
            await this.page.waitFor(3000)
            resolve(novelList)
        })
    }


    async close() {
        await this.browser.close()
    }
}

module.exports = Crawler