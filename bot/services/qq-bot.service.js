import Mirai from 'mirai-ts'
import fs from 'fs';
import path from 'path';

const paths = path.resolve(__dirname, "../assets/mirai/config/MiraiApiHttp/setting.yml");
const config = fs.readFileSync(paths, "utf8").split('\n');

const findKey = ['port', 'enableWebsocket', 'authKey', 'host']
const findConfig = { port: 8080, authKey: 'auth-key', enableWebsocket: 'false', host: '127.0.0.1' };
config.forEach((text) => {
  findKey.forEach((key) => {
    const data = text.split(':');
    if (data.includes(key)) {
      findConfig[key] = data[1].trim();
    }
  })
})
console.log('findConfig', findConfig);

// 你的 QQ 号
const qq = 1823965805;

const mahConfig = {
  host: findConfig.host,
  port: Number(findConfig.port),
  authKey: findConfig.authKey,
  // 推荐 true，websocket 无须轮询，更少占用资源。
  enableWebsocket: findConfig.enableWebsocket === 'true',
};

const app = async () => {

  const mirai = new Mirai(mahConfig);
  // 登录 QQ
  await mirai.link(qq);

  // 对收到的消息进行处理
  // message 本质相当于同时绑定了 FriendMessage GroupMessage TempMessage
  // 你也可以单独对某一类消息进行监听
  // console.log("on message");
  mirai.on("message", (msg) => {
    console.log('message', msg);
    // 复读
    // msg.reply(msg.messageChain);
  });

  // 调用 mirai-ts 封装的 mirai-api-http 发送指令
  // console.log("send command help");
  // const data = await mirai.api.command.send("help", []);
  // console.log("帮助信息:" + data);

  // 处理各种事件类型
  // 事件订阅说明（名称均与 mirai-api-http 中事件名一致）
  // https://github.com/RedBeanN/node-mirai/blob/master/event.md
  // console.log("on other event");
  // https://github.com/project-mirai/mirai-api-http/blob/master/EventType.md#群消息撤回
  mirai.on("GroupRecallEvent", ({ operator }) => {
    const text = `${operator.memberName} 撤回了一条消息，并拜托你不要再发色图了。`;
    console.log(text);
    // mirai.api.sendGroupMessage(text, operator.group.id);
  });

  // 可传入回调函数对监听的函数进行处理，如：
  mirai.listen((msg) => {
    console.log('listen', msg)
  })
}

// app();