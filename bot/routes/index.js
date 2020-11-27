import koaRouter from 'koa-router';

import serialService from '../services/serial.service';

const router = koaRouter({
  prefix: '/api'  // 路由加前缀 /user
});

router.get('/link-network', async (ctx) => serialService.connectionNetwork(ctx));
router.get('/link-exchange', async (ctx) => serialService.connectionExchange(ctx));
router.post('/one', async (ctx) => serialService.one(ctx));
router.post('/auto-capture', async (ctx) => serialService.autoCaptureSend(ctx));

export default router;
