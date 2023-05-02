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

  async function handleImageUpload(event) {
    const img = new Image();
    img.src = "/test_image.jpeg";

    img.onload = async function () {
      console.log("predicing ... ");
      // console.log(typeof img);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const image = tf.browser.fromPixels(imageData);
      const processedImage = tf.image.resizeBilinear(image, [224, 224]);
      await predict(processedImage);
    };
    // const image = tf.browser.fromPixels(event.target);
    // const processedImage = tf.image.resizeBilinear(image, [224, 224]);
    // await predict(processedImage);
  }

  useEffect(() => {
    // handleImageUpload();
  }, []);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleImageUpload}>
        run
      </button>

      {/* <img src="/test_image.jpeg" alt="" /> */}
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default PredictPlantDisease;
