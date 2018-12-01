const {pbkdf2} = require('./modules/utils.js')

pbkdf2('123456', 'ADMIN_USER_SALT').then(code => {console.log(code)})
