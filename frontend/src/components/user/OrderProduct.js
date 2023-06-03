import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe('pk_test_51ND6JrSBZfgpftdthUBjGrS4HsVGWHEE6e20t49f3Jjx8A2Omcux10h4jOc6r9ZHXHcOCHPIiwJCJeY2jC3Ey2g80099YVN2nV');

const OrderProduct = () => {
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret,
    appearance
  };

  const [product, setProduct] = useState(JSON.parse(sessionStorage.getItem('productData')));

  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: product.price })
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
  }, [])
  

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Order Product</h4>
          </div>
          <div className="card-body">
            <p className="fw-bold">Product Name : </p>
            <p className="h3">{product.title}</p>
            <p className="fw-bold">Price : </p>
            <p className="h1">{product.price}</p>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
