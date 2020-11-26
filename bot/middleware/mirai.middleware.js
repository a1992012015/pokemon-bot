import childProcess from 'child_process';
import Mirai from 'mirai-ts';

const botQQ = 1823965805;
const botPassword = 'mengyehuanyu123.';

const startMirai = () => {
  const miraiConsole = childProcess.spawn('yarn', ['run', 'start-mirai'], {
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (botQQ && botPassword) {
    Mirai.log.info("自动登录 QQ");
    const loginCmd = `login ${botQQ} ${botPassword}\n`;
    console.log('loginCmd', loginCmd);
    miraiConsole.stdin.write(loginCmd);
  }
  return miraiConsole;
}

export default () => {
  startMirai();

  return async (ctx, next) => {
    await next();
  };
};