const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

const router = new Router();

app.use(require("koa-static")(__dirname + "/static"));
app.use(bodyParser());

router.get("/", async (ctx, next) => {
    ctx.body = 'hello there'
    await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9527);
