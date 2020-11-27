import childProcess from "child_process";

console.log(process.env);
console.log(process.env.BOT_PASSWORD);
childProcess.exec('ls /dev/tty.usb*', (error, stdout) => {
  console.log('stdout', stdout);
});