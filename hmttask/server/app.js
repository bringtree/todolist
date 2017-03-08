'use strict';

const mongoose = require('mongoose');
const app = require('koa')();
const koa = require('koa-router')();
const koaStatic = require('koa-static');
// const route = require('koa-route');
const json = require('koa-json');
const logger = require('koa-logger');
const register = require('../server/routes/register.js');
const auth = require('../server/routes/auth.js');
const saywords = require('../server/routes/saywords');
const zang = require('../server/routes/zang');
const todolist = require('../server/controllers/todolist.js');
// const path  =require('path')
// const serve = require('koa-static')
const historyApiFallback = require('koa-history-api-fallback')
// const jwt = require('jsonwebtoken');

// app.use(json());
// app.use(logger());


app.on('error', function (err, ctx) {
  console.log('server error', err);
});

koa.use('/auth', auth.routes());
koa.use('/auth', register.routes());
koa.use("/auth", saywords.routes());
koa.use("/auth", zang.routes());
koa.get("/api/list", todolist.getAllTodolist);

app.use(koa.routes());
app.use(koaStatic('../dist'))
app.use(historyApiFallback());
// app.use(serve(path.resolve('dist')));

app.on('error', function (err) {
  console.error(err.stack);
  console.log(err.message);
});




app.listen(3000, () => {
  console.log('Server started, please visit: http://127.0.0.1:3000');
});

const connString = 'mongodb://localhost:27017/text';
mongoose.connect(connString, {/*config: { autoIndex: false }*/});
