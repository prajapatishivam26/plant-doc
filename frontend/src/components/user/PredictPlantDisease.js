
import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import app_config from '../../config';

const URL = '/AImodels';

const PredictPlantDisease = () => {
  const [model, setModel] = useState(null);

  const {apiUrl} = app_config;

  const saveImage = async (filename) => {
    
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(apiUrl + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        saveImage();
        predict(file);
      }
    });
  };

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
    console.log(image);
    const prediction = await model.predict(image);
    // Do something with prediction
  }

  async function handleImageUpload() {
    const img = new Image();
    img.src = '/test_image.jpeg';
    img.onload = async function () {
      // console.log(img);
      const image = tf.browser.fromPixels(img);
      const processedImage = tf.image.resizeBilinear(image, [224, 224]);
      console.log('predicing ... ');
      // console.log(processedImage);
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
      <button onClick={handleImageUpload}>test</button>
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
                  <img src="https://cdn-icons-png.flaticon.com/512/3616/3616929.png" width={200} className='d-block m-auto' />
                  <label className='text-center h4 d-block' htmlFor='upload-image'>Upload Leaf Image</label>
                  <input hidden type="file" onChange={uploadFile} id="upload-image" />
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