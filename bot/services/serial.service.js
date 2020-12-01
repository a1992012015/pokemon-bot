import moment from 'moment';
import SerialUtilities from '../utilities/serial.utilities';
import qqBotService from './qq-bot.service';

class SerialService extends SerialUtilities {

  constructor() {
    super();
  }

  connectionNetwork = async (ctx) => {
    try {
      await this.linkNetwork();
      ctx.body = { massage: '连接网络完成。。。' };
    } catch (e) {
      ctx.body = { massage: e.message };
      this.isActive = true;
    }
  };

  connectionExchange = async (ctx) => {
    try {
      await this.send(this.ns_Y);
      await this.sleep(1.5);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      await this.send(this.ns_DOWN);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(1);

      const password = await this.getLinkPassword();
      console.log('password', password);
      await this.enterPassword(password);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      ctx.body = { massage: '连接交换开始。。。' };
    } catch (e) {
      ctx.body = { massage: e.message };
      this.isActive = true;
    }
  };

  startExchange = async (ctx) => {
    try {
      for (let i = 0; i < 5; i++) {
        console.log(`当前 ${i + 1}`);
        await this.send(this.ns_A);
        await this.sleep(0.5);
        await this.send(this.ns_A);
        await this.sleep(0.5);
      }
      const seed = await this.getPokemonSeed();
      for (let i = 0; i < 2; i++) {
        await this.send(this.ns_B);
        await this.sleep(0.5);
        await this.send(this.ns_B);
        await this.sleep(0.5);
      }
      await this.send(this.ns_X);
      await this.sleep(2);
      await this.send(this.ns_A);
      await this.sleep(2);
      await this.send(this.ns_R);
      await this.sleep(2);

      await this.autoRelease();

      for (let i = 0; i < 3; i++) {
        await this.send(this.ns_B);
        await this.sleep(2);
      }

      console.log('seed', seed);
      ctx.body = { massage: seed };
    } catch (e) {
      ctx.body = { massage: e.message };
      this.isActive = true;
    }
  };

  getLinkPassword = async () => {
    await qqBotService.reSendBotMassage();

    return new Promise((resolve) => {
      qqBotService.setListenPassword(resolve);
    });
  };

  getPokemonSeed = async () => {
    return new Promise((resolve) => {
      qqBotService.setListenSeed(resolve);
    });
  };

  autoCaptureSend = async (ctx) => {
    try {
      const { restart, battle_time } = ctx.request.body;
      await this.send(this.ns_R);
      if (restart === '1') {
        await this.restartGame();
        await this.send(this.ns_A);
        await this.sleep(0.5);
      }
      await this.send(this.ns_R);
      await this.send(this.ns_DOWN);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(0.5);
      await this.send(this.ns_A);
      await this.sleep(28);

      for (let t = 0; t < battle_time; t++) {
        let nt = t + 1;
        console.log(`[${moment().format('h:mm:ss a')}] 当前时间 ${nt}`);
        if (nt < 10) {
          await this.send(this.ns_A);
          await this.sleep(0.5);
          await this.send(this.ns_LEFT);
          await this.sleep(0.5);
        } else {
          await this.send(this.ns_A);
          await this.sleep(0.5);
          await this.send(this.ns_A);
          await this.sleep(0.5);
        }
      }
      ctx.body = { massage: '战斗完成，检查战斗结果。。。' };
    } catch (e) {
      ctx.body = { massage: e.message };
      this.isActive = true;
    }
  };
}

export default new SerialService();