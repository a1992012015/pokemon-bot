import moment from 'moment';
import SerialUtilities from '../utilities/serial.utilities';

class SerialService extends SerialUtilities {

  constructor() {
    super();
  }

  connectionNetwork = async (ctx) => {
    await this.linkNetwork();
    ctx.body = { massage: '连接网络完成。。。' };
  };

  connectionExchange = async (ctx) => {
    await this.send(this.ns_Y);
    await this.sleep(1);
    await this.send(this.ns_A);
  };

  autoCaptureSend = async (ctx) => {
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

    for (let t = 0; t <= battle_time; t++) {
      let nt = t + 1;
      // if (nt === battle_time) {
      //   process.stdout.write(`\x1Bc\r[${moment().format('h:mm:ss a')}] 当前时间 ${nt}`)
      // }
      process.stdout.write(`\x1Bc\r[${moment().format('h:mm:ss a')}] 当前时间 ${nt}`);
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
  };
}

export default new SerialService();