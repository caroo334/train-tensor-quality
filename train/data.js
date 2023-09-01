const tf = require('@tensorflow/tfjs-node-gpu');
const fs = require('fs');
const path = require('path');

const TRAIN_IMAGES_DIR = './data/train';
const TEST_IMAGES_DIR = './data/test';

const SIZE_W = 96
const SIZE_H = 96
const FORMAT = "jpeg"

function loadImages(dataDir) {
  const images = [];
  const labels = [];
  
  var files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) { 
    if (!files[i].toLocaleLowerCase().endsWith("."+FORMAT)) {
      continue;
    }
    
    var filePath = path.join(dataDir, files[i]);
    
    var buffer = fs.readFileSync(filePath);
    
    var imageTensor = tf.node.decodeImage(buffer,3)
      .resizeNearestNeighbor([SIZE_W,SIZE_H])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();
    images.push(imageTensor);
    console.log(files[i], 'file')
    if (files[i].toLocaleLowerCase().includes('blur')) labels.push(1);
    else if (files[i].toLocaleLowerCase().includes('bright')) labels.push(2);
    else if (files[i].toLocaleLowerCase().includes('dark')) labels.push(3);
    else if (files[i].toLocaleLowerCase().includes('rotate')) labels.push(4);
    else labels.push(0);
    console.log(labels, 'labels')
  }

  return [images, labels];
}

/** Helper class to handle loading training and test data. */
class TuberculosisDataset {
  constructor() {
    this.trainData = [];
    this.testData = [];
  }

  /** Loads training and test data. */
  loadData() {
    console.log('Loading images...');
    this.trainData = loadImages(TRAIN_IMAGES_DIR);
    //TODO: parece que cuando corres el train usa la testData, 
    //entonces le cambie la direccion para que use las imagenes de /train
    this.testData = loadImages(TRAIN_IMAGES_DIR);
    console.log('Images loaded successfully.')
  }

  getTrainData() {
    return {
      images: tf.concat(this.trainData[0]),
      labels: tf.oneHot(tf.tensor1d(this.trainData[1], 'int32'), 5).toFloat()
    }
  }

  getTestData() {
    return {
      images: tf.concat(this.testData[0]),
      labels: tf.oneHot(tf.tensor1d(this.testData[1], 'int32'), 5).toFloat()
    }
  }
}

module.exports = new TuberculosisDataset();
