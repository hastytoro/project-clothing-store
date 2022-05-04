import styled from "styled-components";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button, { BUTTON_TYPES } from "../button/button";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const { client_secret } = response.paymentIntent;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) alert(paymentResult.error);
    else if (paymentResult.paymentIntent.status === "succeeded")
      alert("payment successful");
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <p>Credit Card Demo (Stripe)</p>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES.invert}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

const PaymentFormContainer = styled.div`
  position: absolute;
  padding: 20px;
  bottom: 0;
  left: 30px;
  background: whitesmoke;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid;
  p {
    font-size: 20px;
    margin-bottom: 25px;
  }
`;

const FormContainer = styled.form`
  height: 100px;
  min-width: 400px;
`;

const PaymentButton = styled(Button)`
  margin-left: auto;
  /* margin-right: auto; */
  margin-top: 30px;
`;

export default PaymentForm;
