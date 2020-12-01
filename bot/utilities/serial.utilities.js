import SerialPort from 'serialport';
import childProcess from 'child_process';

import qqBotService from '../services/qq-bot.service';

export default class SerialUtilities {
  ns_X = 'Button X';
  ns_Y = 'Button Y';
  ns_A = 'Button A';
  ns_B = 'Button B';
  ns_L = 'Button L';
  ns_R = 'Button R';
  ns_ZL = 'Button ZL';
  ns_ZR = 'Button ZR';
  ns_LEFT = 'LX MIN';
  ns_RIGHT = 'LX MAX';
  ns_UP = 'LY MIN';
  ns_DOWN = 'LY MAX';
  ns_UP_LEFT = 'UP_LEFT MIN';
  ns_UP_RIGHT = 'UP_RIGHT MIN';
  ns_DOWN_LEFT = 'DOWN_LEFT MIN';
  ns_DOWN_RIGHT = 'DOWN_RIGHT MIN';
  ns_START = 'Button START';
  ns_SELECT = 'Button SELECT';
  ns_HOME = 'Button HOME';
  ns_CAPTURE = 'Button CAPTURE';
  ns_L3 = 'Button LCLICK';
  ns_R3 = 'Button RCLICK';
  isActive = true;

  constructor() {
  }

  init = () => {
    return new Promise((resolve) => {
      childProcess.exec('ls /dev/tty.usb*', (error, stdout) => {
        this.port = new SerialPort(stdout.trim());
        resolve();
      });
    });
  };

  stopActive = (ctx) => {
    this.isActive = false;
    qqBotService.clearStatus();
    ctx.body = { massage: '操作已停止。。。' };
  };

  send = async (msg, duration = 0.2) => {
    if (this.isActive) {
      this.port.write(`${msg}\r\n`);
      await this.sleep(duration);
      this.port.write('RELEASE\r\n');
    } else {
      throw new Error('停止当前操作');
    }
  };

  sleep = (time = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), time * 1000);
    });
  };

  one = async (ctx) => {
    try {
      const { key } = ctx.request.body;
      await this.send(key);
      ctx.body = { massage: '点击完成。。。' };
    } catch (e) {
      ctx.body = { massage: e.message };
      this.isActive = true;
    }
  };

  linkNetwork = async (con_time = 10) => {
    await this.send(this.ns_B);
    await this.send(this.ns_Y);
    await this.sleep(1);
    await this.send(this.ns_START);
    await this.sleep(con_time);
    await this.send(this.ns_B);
    await this.sleep(0.2);
    await this.send(this.ns_B);
    await this.sleep(2);
  };

  restartGame = async () => {
    // --- game close
    await this.send(this.ns_HOME);
    await this.sleep(1);
    await this.send(this.ns_X);
    await this.sleep(0.5);
    await this.send(this.ns_A);
    await this.sleep(3);
    // --- game open
    await this.send(this.ns_A);
    await this.sleep(1.5);
    await this.send(this.ns_A);
    await this.sleep(18);
    await this.send(this.ns_A);
    await this.sleep(10);
  };

  autoRelease = async () => {
    await this.send(this.ns_A);
    await this.sleep(0.5);
    for (let i = 0; i < 2; i++) {
      await this.send(this.ns_UP);
      await this.sleep(0.5);
    }
    await this.send(this.ns_A);
    await this.sleep(0.5);
    await this.send(this.ns_UP);
    await this.sleep(0.5);
    for (let i = 0; i < 3; i++) {
      await this.send(this.ns_A);
      await this.sleep(0.5);
    }
  }

  enterPassword = async (password) => {
    const ps = password.split('');
    ps.unshift('1');
    for (let i = 0; i < 8; i++) {
      const { nx, ny } = this.numDist(parseInt(ps[i]), parseInt(ps[i + 1]));
      if (ps[i] === '0') {
        await this.move(ny, this.ns_DOWN, this.ns_UP);
        await this.move(nx, this.ns_RIGHT, this.ns_LEFT);
      } else {
        await this.move(nx, this.ns_RIGHT, this.ns_LEFT);
        await this.move(ny, this.ns_DOWN, this.ns_UP);
      }
      await this.send(this.ns_A, 0.07);
      await this.sleep(0.03);
    }
    await this.send(this.ns_START);
    await this.sleep(1);
    await this.send(this.ns_A);
    await this.sleep(0.5);
  };

  numDist = (a, b) => {
    const cols = [2, 1, 2, 3, 1, 2, 3, 1, 2, 3];
    const rows = [4, 1, 1, 1, 2, 2, 2, 3, 3, 3];
    const ny = rows[b] - rows[a];
    const nx = cols[b] - cols[a];
    return { nx, ny };
  };

  move = async (c, btn1, btn2) => {
    if (c > 0) {
      for (let i = 0; i < c; i++) {
        await this.send(btn1);
        await this.sleep(0.02);
      }
    } else {
      for (let i = 0; i < -c; i++) {
        await this.send(btn2);
        await this.sleep(0.02);
      }
    }
  };
}