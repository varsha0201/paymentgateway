import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {
  const [product] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch(`https://localhost:8282/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response)
      const {status} = response;
      console.log("STATUS", status);
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
    
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
          stripeKey="pk_test_51HA8TqIJgrleGsboqlpWl3jLk4Mzg780lrHh67yfkt2qpWQgf5ihh3WdpDoDEdf4CqzX0NEPIYOZwgJvqME9Qiub00dgyqqfJy"
          token={makePayment} 
          name="Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large blue">
            Buy React is Just {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
