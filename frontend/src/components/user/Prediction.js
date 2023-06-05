import React, { useEffect, useRef, useState } from 'react'
import app_config from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const Prediction = () => {

  const { apiUrl, modelPath } = app_config;

  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);

  const navigate = useNavigate();

  const [selImage, setSelImage] = useState('');

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [showWebcam, setShowWebcam] = useState(false);

  let webcam, labelContainer;

  const webcamRef = useRef(null);
  // const modelURL = '<MODEL_URL>'; // Replace with your model URL
  // const    = useRef(null);

  const predictionResultExtractor = (prediction) => {

    return prediction.find((pred) => pred.probability === Math.max(...prediction.map((pred) => pred.probability)));
    let result = [];
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      result.push(classPrediction);
    }
    return result;
  }

  const saveImage = async (file) => {
    const fd = new FormData();
    fd.append('myfile', file);
    const res = await fetch(apiUrl + '/util/uploadfile', {
      method: 'POST',
      body: fd
    });
    if (res.status === 200) {
      console.log('file uploaded');

      const res = await fetch(apiUrl + '/image/add', {
        method: 'POST',
        body: JSON.stringify({
          file: file.name,
          user: JSON.parse(sessionStorage.getItem('user'))._id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);


      // return file.name;
    }
  }

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

  const capture = async () => {
    setShowWebcam(true);
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = document.createElement('img');
      img.src = imageSrc;
      console.log(img);
      document.body.appendChild(img);

      const prediction = await model.predict(img);
      console.log(prediction);
      const result = predictionResultExtractor(prediction);
      console.log(result);
      setResult(result);
    }
  };

  // useEffect(() => {
  //   async function loadModel() {
  //     model.current = await tmImage.load(modelURL);
  //     console.log('Model loaded successfully!');
  //   }

  //   loadModel();
  // }, []);

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

  const predictFromImage = async (img) => {
    // predict can take in an image, video or canvas html element
    // let img = new Image();
    // img.src = '/leaf2.jpg';
    // console.log(img);
    // console.log(webcam.canvas);
    // console.log(webcam.canvas.value);
    // const prediction = await model.predict(webcam.canvas);
    // console.log(model);
    const prediction = await model.predict(img);
    console.log(prediction);
    const result = predictionResultExtractor(prediction);
    console.log(result);
    setResult(result);
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Prediction Completed'
    })
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //         // labelContainer.childNodes[i].innerHTML = classPrediction;
    //         console.log(classPrediction);
    //     }
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
      reader.onload = function (loadedEvent) {
        // Set the image source to the uploaded image data
        img.src = loadedEvent.target.result;
        setSelImage(loadedEvent.target.result);
        predictFromImage(img);
        saveImage(file);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  const findCure = () => {
    const cureData = app_config.cureData.find((cure) => cure.diseaseName === result.className);
    console.log(cureData);
    if (cureData) {
      sessionStorage.setItem('cureData', JSON.stringify(cureData));
      navigate('/user/cure');
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v986-bg-02-kqhe3wit.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=a18675d7f6be224df8ff585d65d5d8dc')" }}>
      <header className='bg-dark'>
        <div className="container py-5 "  >
          <p className="display-4 text-center fw-bold text-white">Plant Doc</p>
          <h1 class="text-center text-white ">What's Wrong With My Plant?</h1>

        </div>
      </header>

      <section>
        <div className="container">
          <div className="row">
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-header'>
                  <h4 className='text-center'>Use Camera</h4>
                </div>
                <div className='card-body'>
                  {
                    showWebcam &&
                    <Webcam ref={webcamRef} />
                  }
                  <button onClick={capture}>Capture</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mx-auto">
              <div className="card"
              //   style={{height: '70vh', backgroundSize: 'cover', backgroundImage: `url('https://images.unsplash.com/photo-1538438253612-287c9fc9217e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80')`}}
              >
                <div className="card-body">
                  {/* <img src="" /> */}
                  <h4 className='text-center'>Upload Leaf Image</h4>
                  <label className='d-block btn btn-primary px-5 py-3' htmlFor="leaf-image">
                    <i class="fas fa-upload fa-2x"></i>&nbsp;&nbsp;
                    Upload Leaf Image</label>
                  <input hidden type='file' onChange={handleImageUpload} id="leaf-image" />

                  {
                    selImage ? <img style={{ height: '400px' }} className='d-block m-auto mt-4' src={selImage} alt="" /> : <p className='text-center h1 mt-5 bg-white py-4'>Select a leaf image to predict disease</p>
                  }

                  {
                    result && (
                      result.className.endsWith('healthy') ?
                        <p className='display-4 fw-bold text-success text-center'>Congratulations!! Your plant is Healthy</p> :
                        (
                          <>
                            <p className='h1 fw-bold text-danger text-center'>OOps!! Your plant has been detected with disease : {result.className}</p>
                            <button className='btn btn-success mt-3 w-100' onClick={findCure}> Find Cure for Your Disease <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                          </>
                        )
                    )
                  }
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