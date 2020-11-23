import * as tfNode from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';
import path from 'path';
import fs from 'fs';

const loadModel = async () => {
  return await mobilenet.load({
    version:2,
    modelUrl: 'https://www.gstaticcnapps.cn/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_100_224/classification/1/model.json'
  });
}

const classify = async () => {
  const image = fs.readFileSync(path.join(__dirname, './panda.jpeg'));
  const decodedImage = tfNode.node.decodeImage(image, 3);

  const model = await loadModel();
  return await model.classify(decodedImage);
}

classify().then(predictions => {
  console.log('predictions:', predictions);
})