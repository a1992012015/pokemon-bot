import serialService from './serial.service';

serialService.init().then(() => {
  console.log('init...');
  serialService.autoRelease().then(() => {
    console.log('完成 autoRelease...');
  });
});

