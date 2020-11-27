import childProcess from 'child_process';
import Mirai from 'mirai-ts';

const startMirai = () => {
  const miraiConsole = childProcess.spawn('yarn', ['run', 'start-mirai'], {
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (process.env.BOT_QQ && process.env.BOT_PASSWORD) {
    Mirai.log.info("自动登录 QQ");
    const loginCmd = `login ${process.env.BOT_QQ} ${process.env.BOT_PASSWORD}\n`;
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