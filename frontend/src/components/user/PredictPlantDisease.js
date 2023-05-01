import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "/AImodels";

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
    console.log(prediction);
  }

  async function handleImageUpload(imgData) {
    const image = new Image();
    image.src =
      "https://eorganic.org/sites/eorganic.info/files/u3/foliar_late_blight.jpg";
    image.onload = () => {
      const tensor = tf.browser.fromPixels(image);
      console.log(tensor.shape);
    };
    // const image = tf.browser.fromPixels('');
    // const processedImage = tf.image.resizeBilinear(image, [224, 224]);
    // await predict(processedImage);
  }

  async function handleFileSelect(event) {
    const file = event.target.files[0];

    // Create a new FileReader object
    const reader = new FileReader();

    // Set up the reader to read the file as a data URL
    reader.readAsDataURL(file);

    // Wait for the reader to load the file
    reader.onload = async () => {
      const imgData = new Image();
      imgData.src = reader.result;

      // Wait for the image to load
      imgData.onload = async () => {
        await handleImageUpload(imgData);
      };
    };
  }

  

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default PredictPlantDisease;
