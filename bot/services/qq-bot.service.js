import Mirai, { check, Message } from 'mirai-ts';
import fs from 'fs';
import path from 'path';

class QqBotService {
  findConfig = { port: 8080, authKey: 'auth-key', enableWebsocket: 'false', host: '127.0.0.1' };
  subType = '';
  activeStatus = '';
  subEvent = {
    PASSWORD: 'PASSWORD',
    SEED: 'SEED'
  };
  BOT_STATUS = {
    WORKING: 'WORKING',
    WAITING_FREE: 'WAITING_FREE',
    WAITING_LINK: 'WAITING_LINK',
    WAITING_RESTART: 'WAITING_RESTART',
    NO_RESPONSE: 'NO_RESPONSE'
  };

  constructor() {
    const paths = path.resolve(__dirname, '../assets/mirai/config/MiraiApiHttp/setting.yml');
    const config = fs.readFileSync(paths, 'utf8').split('\n');

    const findKey = ['port', 'enableWebsocket', 'authKey', 'host'];
    config.forEach((text) => {
      findKey.forEach((key) => {
        const data = text.split(':');
        if (data.includes(key)) {
          this.findConfig[key] = data[1].trim();
        }
      });
    });
  }

  init = async () => {
    // 你的 QQ 号
    const qq = parseInt(process.env.BOT_QQ);

    const mahConfig = {
      host: this.findConfig.host,
      port: parseInt(this.findConfig.port),
      authKey: this.findConfig.authKey,
      // 推荐 true，websocket 无须轮询，更少占用资源。
      enableWebsocket: this.findConfig.enableWebsocket === 'true'
    };

    this.mirai = new Mirai(mahConfig);
    // 登录 QQ
    await this.mirai.link(qq);

    this.mirai.on('GroupMessage', (massage) => {
      this.groupMassageHandle(massage);
      // mirai.api.sendGroupMessage(text, operator.group.id);
    });

    // 可传入回调函数对监听的函数进行处理，如：
    this.mirai.listen();
  };

  groupMassageHandle = async (massage) => {
    console.log('activeStatus', this.activeStatus);
    console.log('subType', this.subType);
    if (this.activeStatus !== this.BOT_STATUS.WORKING) {
      switch (this.subType) {
        case this.subEvent.PASSWORD:
          console.log('PASSWORD', massage);
          await this.passwordHandle(massage);
          break;
        case this.subEvent.SEED:
          console.log('SEED', massage);
          await this.seedHandle(massage);
          break;
        default:
          console.log('massage', massage);
          break;
      }
    }
  };

  sedGroupMassage = async (id, mas) => {
    await this.mirai.api.sendGroupMessage(mas, id);
  };

  clearStatus = () => {
    this.subType = '';
    this.handle = null;
    this.activeStatus = '';
  }

  setListenPassword = (handle) => {
    this.subType = this.subEvent.PASSWORD;
    this.activeStatus = '';
    this.handle = handle;
  };

  passwordHandle = async (massage) => {
    this.activeStatus = this.BOT_STATUS.WORKING;
    if (check.isAt(massage, parseInt(process.env.BOT_QQ))) {
      if (massage.plain.includes('开始连接交换')) {
        this.handle(massage.plain.slice(-8).trim());
        this.subType = '';
        this.handle = null;
        this.activeStatus = '';
      } else if (massage.plain.includes('超时  连接已释放')) {
        this.activeStatus = '';
        const messageChain = [Message.At(1124421652), Message.Plain('测帧')];
        await this.sedGroupMassage(864849588, messageChain);
      }
    } else if (massage.plain === '忙碌中  请等待空闲提示') {
      this.activeStatus = this.BOT_STATUS.WAITING_FREE;
    } else if (this.activeStatus === this.BOT_STATUS.WAITING_FREE && massage.plain.includes('交换结束  空闲中')) {
      this.activeStatus = '';
      await this.reSendBotMassage();
    }
  };

  setListenSeed = (handle) => {
    this.subType = this.subEvent.SEED;
    this.activeStatus = '';
    this.handle = handle;
  };

  seedHandle = async (massage) => {
    this.activeStatus = this.BOT_STATUS.WORKING;
    if (check.isAt(massage, parseInt(process.env.BOT_QQ))) {
      const plainMas = massage.plain.split('\n');
      const mag = plainMas.find((mas) => mas.includes('SEED'));
      const index = mag.trim().indexOf('：');
      this.handle(mag.trim().slice(index + 1));
      this.subType = '';
      this.handle = null;
      this.activeStatus = '';
    } else {
      this.activeStatus = '';
    }
  };

  reSendBotMassage = async () => {
    const messageChain = [Message.At(1124421652), Message.Plain('测帧')];
    await this.sedGroupMassage(864849588, messageChain);
  };
}

export default new QqBotService();