const DB = require('./modules/DB.js')

DB['NovelModel'].find({}).then(docs => {
	console.log(docs);
})
