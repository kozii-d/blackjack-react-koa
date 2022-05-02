const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');

const PORT = 3000
const app = new Koa();
const router = require("./routes/router");

app.use(serve(path.join(__dirname, '../public/static')));
app.use(router.routes());

app.listen(PORT);
