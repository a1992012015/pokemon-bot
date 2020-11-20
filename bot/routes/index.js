import koaRouter from 'koa-router';

const router = koaRouter();
router
  .get('/', async (ctx, next) => await ctx.render('index.html'))
  .get('/string', async (ctx, next) => ctx.body = 'koa2 string')
  .get('/json', async (ctx, next) => ctx.body = { title: 'koa2 json' })
  // .get('*', async (ctx, next) => ctx.redirect('/'))

export default router;
