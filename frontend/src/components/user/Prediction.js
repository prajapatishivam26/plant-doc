import React, { useEffect, useState } from 'react'
import app_config from '../../config';

const Prediction = () => {

    const { apiUrl, modelPath } = app_config;

    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(null);

    let webcam, labelContainer;

    async function init() {
        const modelURL = modelPath + "/model.json";
        const metadataURL = modelPath + "/metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        let modelT = await window.tmImage.load(modelURL, metadataURL);
        setMaxPredictions(modelT.getTotalClasses());
        setModel(modelT);

        // Convenience function to setup a webcam
        // const flip = true; // whether to flip the webcam
        // webcam = new window.tmImage.Webcam(200, 200, flip); // width, height, flip
        // await webcam.setup(); // request access to the webcam
        // await webcam.play();
        // window.requestAnimationFrame(loop);

        // append elements to the DOM
        // document.getElementById("webcam-container").appendChild(webcam.canvas);
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }
    }

    async function predict() {
        // predict can take in an image, video or canvas html element
        let img = new Image();
        img.src = 'leaf2.jpg';
        console.log(img);
        // console.log(webcam.canvas);
        // console.log(webcam.canvas.value);
        // const prediction = await model.predict(webcam.canvas);
        const prediction = await model.predict(img);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
    
    const predictFromImage =  async (img) => {
        // predict can take in an image, video or canvas html element
        // let img = new Image();
        // img.src = '/leaf2.jpg';
        console.log(img);
        // console.log(webcam.canvas);
        // console.log(webcam.canvas.value);
        // const prediction = await model.predict(webcam.canvas);
        const prediction = await model.predict(img);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                // labelContainer.childNodes[i].innerHTML = classPrediction;
                console.log(classPrediction);
            }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    useEffect(() => {
      init();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const img = new Image();

    // Validate if a file is selected
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();

      // Set up the FileReader onload event
      reader.onload = function(loadedEvent) {
        // Set the image source to the uploaded image data
        img.src = loadedEvent.target.result;
        predictFromImage(img);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
}

  return (
    <div>
        <button className='btn btn-primary' onClick={predictFromImage}>Predict</button>
        <img src="/leaf2.jpg" />
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

export default Prediction