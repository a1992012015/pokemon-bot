import serialService from '../services/serial.service';

export default () => {
  return async (ctx, next) => {
    if (!serialService.port) {
      await serialService.init();
    }
    await next();
  };
};