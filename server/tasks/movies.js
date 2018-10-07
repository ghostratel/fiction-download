const childProcess = require('child_process')
const path = require('path')

;(async () => {
    const crawler = path.resolve(__dirname, '../crawler/movieList.js')
    const __childProcess = childProcess.fork(crawler)
    let result = null
    
    __childProcess.on('message', (data) => {
        result = data
        console.log(result)
    })
    __childProcess.on('exit', () => {
        console.log('子进程退出')
    })
})()