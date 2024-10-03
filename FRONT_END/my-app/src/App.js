import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';

const App = () => {
  const [userId] = useState('603c9b5c67e4d20394f01b68'); // Replace this with the actual user ID
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handlePaymentSuccess = (customer, paymentMethod) => {
    console.log('Payment Success:', customer, paymentMethod);
    setPaymentInfo({ customer, paymentMethod });
  };

  return (
    <div>
      <h1>Stripe Payment Integration</h1>
      {!paymentInfo ? (
        <PaymentForm userId={userId} onPaymentSuccess={handlePaymentSuccess} />
      ) : (
        <div>
          <h2>Payment Successful!</h2>
          <p>Customer ID: {paymentInfo.customer.id}</p>
          <p>Payment Method ID: {paymentInfo.paymentMethod.id}</p>
        </div>
      )}
    </div>
  );
};

export default App;



