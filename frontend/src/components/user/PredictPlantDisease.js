
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
    const img = new Image();
    img.src = '/test_image.png';
    img.onload = async function () {
      const image = tf.browser.fromPixels(img);
      const processedImage = tf.image.resizeBilinear(image, [224, 224]);
      console.log('predicing ... ');
      await predict(processedImage);
    }
    // const image = tf.browser.fromPixels(event.target);
    // const processedImage = tf.image.resizeBilinear(image, [224, 224]);
    // await predict(processedImage);
  }

  useEffect(() => {
    handleImageUpload();
  }, [])


  return (
    <div>
      <header className='bg-dark'>
        <div className="container py-5 "  >
          <h1 class="text-center text-white display-4 fw-bold ">What's Wrong With My Plant?</h1>

        </div>
      </header>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card my-div" >
                <div className="card-body">
                    <img src='' />
                    <h1>Use Webcam</h1>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card my-div" style={{backgroundImage: `url('https://thumbs.dreamstime.com/b/small-green-plant-pot-home-design-abstract-house-potted-against-white-background-minimal-creative-concept-space-copy-164229780.jpg')`}}>
                <div className="card-body">
                  <img src="" />
                  <h4 className='text-center'>Upload Leaf Image</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  )

}


export default PredictPlantDisease;