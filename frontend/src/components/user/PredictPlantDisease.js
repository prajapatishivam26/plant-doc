
import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const URL = '/AImodels';

const PredictPlantDisease = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const modelURL = `${URL}/model.json`;
      const metadataURL = `${URL}/metadata.json`;
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  async function predict(image) {
    const prediction = await model.predict(image);
    // Do something with prediction
  }

  async function handleImageUpload(event) {
    const image = tf.browser.fromPixels(event.target);
    const processedImage = tf.image.resizeBilinear(image, [224, 224]);
    await predict(processedImage);
  }

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
}

export default PredictPlantDisease;