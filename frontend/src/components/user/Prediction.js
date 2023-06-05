import React, { useEffect, useRef, useState } from 'react'
import app_config from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const Prediction = () => {

  const { apiUrl, modelPath } = app_config;

  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);

  const [selImg, setSelImg] = useState('');

  const [selImage, setSelImage] = useState('');

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [loadedImage, setLoadedImage] = useState(null);

  const [result, setResult] = useState(null);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  let webcam, labelContainer;

  const predictionResultExtractor = (prediction) => {
    let tempRes = prediction.find((pred) => pred.probability === Math.max(...prediction.map((pred) => pred.probability)));
    if (tempRes.probability < 0.5) {
      return { className: 'Sorry! Unknown Plant', probability: 0 }
    }
    return tempRes;
    let result = [];
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
      result.push(classPrediction);
    }
    return result;
  };

  const uploadFile = (file) => {
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(apiUrl + '/util/uploadfile', {
      method: 'POST',
      body: fd
    }).then((res) => {
      if (res.status === 200) {
        console.log('file uploaded');
      }
    });
  };

  const saveHistory = async (res) => {
    const response = await fetch(`${apiUrl}/prediction/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: selImg,
        user: currentUser._id,
        result: res,
        createdAt: new Date()
      })
    });
    const data = await response.json();
    console.log(data);
  };

  async function init() {
    const modelURL = modelPath + '/model.json';
    const metadataURL = modelPath + '/metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    let modelT = await window.tmImage.load(modelURL, metadataURL);
    setMaxPredictions(modelT.getTotalClasses());
    setModel(modelT);
  }

  const predictFromImage = async () => {
    const prediction = await model.predict(loadedImage);
    console.log(prediction);
    console.log(predictionResultExtractor(prediction));
    setResult(predictionResultExtractor(prediction));
    saveHistory(predictionResultExtractor(prediction));
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'Prediction Completed'
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelImg(file.name);
    uploadFile(file);
    const img = new Image();

    // Validate if a file is selected
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      console.log();
      // Set up the FileReader onload event
      reader.onload = function (loadedEvent) {
        // Set the image source to the uploaded image data
        console.log('loaded');
        img.src = loadedEvent.target.result;
        setSelImage(loadedEvent.target.result);
        setLoadedImage(img);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

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

{loadedImage && (
                      <button className="btn btn-primary mt-5" onClick={predictFromImage}>
                        Predict Disease
                      </button>
                    )}

                  {
                    result && (
                      result.className.endsWith('healthy') ?
                        <p className='display-4 fw-bold text-success text-center'>Congratulations!! Your plant is Healthy</p> :
                        (
                          <>
                            <p className='h1 fw-bold text-danger text-center'>OOps!! Your plant has been detected with disease : {result.className}</p>
                            {/* <button className='btn btn-success mt-3 w-100' onClick={findCure}> Find Cure for Your Disease <i class="fa fa-arrow-right" aria-hidden="true"></i></button> */}
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