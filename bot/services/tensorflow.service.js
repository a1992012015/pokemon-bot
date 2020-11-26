import * as tfNode from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';
import path from 'path';
import fs from 'fs';

const loadModel = async () => {
  return await mobilenet.load({
    version: 2,
    modelUrl: 'https://www.gstaticcnapps.cn/tfhub-tfjs-modules/google/imagenet/mobilenet_v1_100_224/classification/1/model.json'
  });
}

const classify = () => {
  const paths = [path.join(__dirname, './panda.jpeg'), path.join(__dirname, './rabbit.jpg')];
  paths.forEach(async (imgPath) => {
    const image = fs.readFileSync(imgPath);
    const decodedImage = tfNode.node.decodeImage(image, 3);

    const model = await loadModel();
    const result = await model.classify(decodedImage);
    console.log('result', result);
  });
}

classify()