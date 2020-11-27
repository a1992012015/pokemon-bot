import SerialPort from 'serialport';
import childProcess from 'child_process';

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

  send = async (msg, duration = 0.2) => {
    this.port.write(`${msg}\r\n`);
    await this.sleep(duration);
    this.port.write('RELEASE\r\n');
  };

  sleep = (time = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), time * 1000);
    });
  };

  one = async (ctx) => {
    const { key } = ctx.request.body;
    await this.send(key);
    ctx.body = { massage: 'A 完成。。。' };
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
}