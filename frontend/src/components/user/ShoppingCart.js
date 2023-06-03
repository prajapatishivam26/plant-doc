import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from './CheckoutPage';
import { loadStripe } from '@stripe/stripe-js';
import useProductContext from '../../context/ProductContext';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import app_config from '../../config';

const stripePromise = loadStripe(
  "pk_test_51NAWp1SCPacst9Jc5mNIG1n7wWazStI6fyZsE4vsLHFnMncWtmoIZHR9yjiwVwn25ARWEpbLhfPXFqooirlk50qC00HtMHHCle"
);

const ShoppingCart = () => {
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret,
    appearance
  };

  const { apiUrl } = app_config;
  const { cartItems, addItemToCart, removeItemFromCart, clearCart, isInCart, getCartTotal, getCartItemsCount } = useProductContext();
  useEffect(() => {
    if (getCartTotal() > 0) {
      // Create PaymentIntent as soon as the page loads
      fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: getCartTotal() })
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  const displayCartItems = () => {
    if (getCartItemsCount() === 0)
      return (
        <div className="text-center">
          <MDBCardImage src={'/cart.png'} alt="login form" className="rounded-start mt-4 w-25 text-center" />
          <h3>Your Cart is Currently Empty!</h3>
          <p className="text-muted">
            Before proceed to checkout you must add some products to your shopping cart. <br />
            You will fill a lot of interesting products on our "Product" page.
          </p>
          <Link className="btn rounded-pill" style={{ backgroundColor: '#4BCCF2', color: '#fff' }} to={'/main/ListEquipment'}>
            Return To Shop
          </Link>
        </div>
      );
    return cartItems.map((item) => (
      <div key={item._id} className="row mb-3">
        <div className="col-2">
          <div
            className="cart-item-placeholder"
            style={{
              backgroundImage: `url('${apiUrl}/${item.image}')`
            }}
          ></div>
        </div>
        <div className="col-7">
          <p className="text-muted h6">{item.brand}</p>
          <h3>{item.title}</h3>
          <p className="text-muted">{item.description.slice(0, 100)}...</p>
        </div>
        <div className="col-3">
          <div className="input-group">
            <button className="btn btn-primary px-3 py-2" onClick={(e) => addItemToCart(item)}>
              {' '}
              <i class="fa fa-plus-circle" aria-hidden="true"></i>{' '}
            </button>
            <input type="text" className="form-control" value={item.quantity} />
            <button className="btn btn-primary px-3 py-2" onClick={(e) => removeItemFromCart(item)}>
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </button>
          </div>
          <h2 className="my-2"> ₹ {item.price}</h2>
        </div>
      </div>
    ));
    // return (
    //     <>
    //         {cartItems.map((item) => (
    //             <div key={item._id}>
    //                 <img src={item.image} alt={item.name} />
    //                 <p>{item.name}</p>
    //                 <p>{item.price}</p>
    //                 <p>{item.quantity}</p>
    //                 <button className='btn btn-primary' onClick={() => addItemToCart(item)}>+</button>
    //                 <button className='btn btn-primary' onClick={() => removeItemFromCart(item)}>-</button>
    //             </div>
    //         ))}
    //     </>
    // );
  };

  return (
    <div>
      <MDBContainer className="my-3">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="9">
              <h2 className="mt-2 mx-3">Shopping Cart</h2>
              <hr />
              {displayCartItems()}

              {/* <p>Continue Shopping</p> */}
            </MDBCol>

            <MDBCol md="3">
              <MDBCardBody className="">
                {/* <div className="col-md-4"> */}
                <div className="card " style={{ height: '50vh' }}>
                  <div className="card-body">
                    <h3>Order Summary</h3>
                    <hr />

                    <p>Total: {getCartTotal()}</p>
                    <p>Items: {getCartItemsCount()}</p>
                    <button className="btn btn-danger" onClick={() => clearCart()}>
                      Clear Cart
                    </button>
                    <Link to="/User/CheckOutPage" className="btn btn-danger">
                      CheckOut
                    </Link>
                  </div>
                </div>
                {/* </div> */}

                <div className="d-flex flex-row justify-content-start"></div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>

        <div className="card">
          <div className="card-body">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            )}
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default ShoppingCart;
