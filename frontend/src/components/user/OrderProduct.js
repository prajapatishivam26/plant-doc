import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const OrderProduct = () => {

    const [product, setProduct] = useState(JSON.parse(sessionStorage.getItem('productData')));
    
  return (
    <div>
        <div className="container">
            <div className='card'>
                <div className='card-header'>
                    <h4 className='card-title'>Order Product</h4>
                </div>
                <div className='card-body'>
                    <p className='fw-bold'>Product Name : </p>
                    <p className="h3">{product.title}</p>
                    <p className='fw-bold'>Price : </p>
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
  )
}

export default OrderProduct