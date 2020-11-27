import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';
import cors from 'koa2-cors';

import index from './routes/index';
import history from './middleware/history.middleware';
import startMirai from "./middleware/mirai.middleware";
import startSerial from './middleware/serial.middleware';

const app = new Koa()

// error handler
onerror(app)
// middlewares
app.use(cors())
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(history());
app.use(require('koa-static')(path.join(__dirname, './view')));

app.use(startSerial())
// app.use(startMirai())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(index.routes())// routes

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
