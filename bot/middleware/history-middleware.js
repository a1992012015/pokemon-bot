import history from 'connect-history-api-fallback';

export default (options) => {
  const middleware = history(options);
  const noop = (result) => {
    console.log('history result', result);
  };

  return async (ctx, next) => {
    middleware(ctx, null, noop);
    await next();
  };
};