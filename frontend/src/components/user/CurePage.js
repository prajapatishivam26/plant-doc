import React, { useEffect, useState } from 'react';
import app_config from '../../config';
import { NavLink, useNavigate } from 'react-router-dom';

const CurePage = () => {
  const [cureData, setCureData] = useState(JSON.parse(sessionStorage.getItem('diseaseData')));
  const { apiUrl } = app_config;

  const [productData, setProductData] = useState(null);

  const navigate = useNavigate();

  const fetchCureData = async () => {
    console.log(apiUrl + '/cure/getbyid/' + cureData.itemId);
    if (cureData.itemId) {
      const res = await fetch(apiUrl + '/cure/getbyid/' + cureData.itemId);
      console.log(res.status);
      const data = await res.json();
      console.log(data);
      setProductData(data);
    }
  };

  const orderProduct = async () => {
    sessionStorage.setItem('productData', JSON.stringify(productData));
    navigate('/user/order');
  }

  const displayProduct = () => {
    return (
      <div className="card">
        <div className="row">
          <div className="col-3">
            <img className="card-img-top" style={{ display: 'block', margin: 'auto' }} src={apiUrl + '/' + productData.image} alt="" />
          </div>
          <div className="col-9">
            <div className="card-body">
              <h3>{productData.title}</h3>
              <p className="card-text">{productData.description}</p>
              <button className="btn btn-primary" onClick={orderProduct}>Buy Now</button>
            </div>  
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchCureData();
  }, []);

  const displayCure = () => {
    return (
      <div className="card">
        <div className="card-body">
          <img className="" style={{ display: 'block', margin: 'auto' }} src={cureData.cure.image} alt="" />
          <h1 className="mb-4 text-success text-center fw-bold">{cureData.cure.heading}</h1>
          <div className="row">
            <div className=""></div>
            <div className="col-md-12">
              <p className="h4">{cureData.cure.summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://cdn.kibrispdr.org/data/12/background-plang-14.jpg")'
      }}
    >
      <div className="container">{cureData ? displayCure() : <h1 className="text-center">No Cure Found</h1>}</div>
      <div className="container">{productData !== null && displayProduct()}</div>
    </div>
  );
};

export default CurePage;
