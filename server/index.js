const Koa = require("koa");
const router = require('./router/index.js')
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(require("koa-static")(__dirname + "/static"));
app.use(bodyParser());


app.use(router.routes()).use(router.allowedMethods());

app.listen(9527);
