var jwt = require('jsonwebtoken');
const secret = 'ddd'

var token = jwt.sign({ foo: 'bar' }, secret, {expiresIn: '1s'});
setTimeout(() => {
    jwt.verify(token, secret,(err, r) => {
        if(err) {console.log('err', err)}
        console.log(r, new Date().getTime())
    })
}, 3000)

