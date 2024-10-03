import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';

// Load your Stripe public key here
const stripePromise = loadStripe('pk_test_51Q4NRoJWZHQehGD7y1gykeZS5GSOAgleDjNOjcyr00gbACKBdvdJiu3WDhVRT5uNntNycQiu3wOTbkCN87wN3Ba2000CYl97w1');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);


