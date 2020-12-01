import qqBotService from '../services/qq-bot.service';

export default () => {
  return async (ctx, next) => {
    if (!qqBotService.mirai) {
      await qqBotService.init();
    }
    await next();
  };
};