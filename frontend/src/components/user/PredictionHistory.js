import React, { useEffect, useState } from 'react'
import app_config from '../../config'
import { toast } from 'react-hot-toast';

const PredictionHistory = () => {

    const { apiUrl } = app_config;
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [predictionList, setPredictionList] = useState([]);

    const getUserHistory = async () => {
        const response = await fetch(`${apiUrl}/prediction/getbyuser/${currentUser._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setPredictionList(data);
    };

    const deletePrediction = async (id) => {
        const response = await fetch(`${apiUrl}/prediction/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.status);
        if(response.status === 200){
            toast.success('Prediction Deleted Successfully');
            getUserHistory();
        }
    }

    useEffect(() => {
        getUserHistory();
    }, [])

    const displayHistory = () => {
        return <div class="table-container">
        <table className='table'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Result</th>
                    <th>Confidence</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    predictionList.map((prediction) => (
                        <tr>
                            <td>
                            <img src={'http://localhost:5000/'+prediction.image} height={150} alt="" />

                            </td>
                            <td className='h5'>
                                {prediction.result.className}
                            </td>
                            <td className='h5'>
                                {prediction.result.probability.toFixed(2)*100 + "%"}
                            </td>
                            <td className='h5'>
                                {new Date(prediction.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={e => deletePrediction(prediction._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
        </table>
        </div>
    }

  return (
    <div className='vh-100'>
        <header>

        <div className='container py-5'>
            <p className='display-3 fw-bold'>Prediction History</p>
        </div>
        </header>
        <main>
            <div className='container'>
                {
                    displayHistory()
                }
                </div>
        </main>
    </div>
  )
}

export default PredictionHistory