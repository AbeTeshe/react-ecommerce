import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./checkout.css";
import CurrencyFormat from "react-currency-format";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "../../axios";

const Checkout = () => {
    const user = useSelector(state => state.cart.user);
    const cartItems = useSelector(state=> state.cart.items);
    
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
  
    let total = 0;
  
    for(let i=0; i < cartItems?.length; i++){
        total = total + cartItems[i].totalPrice;
    }

    useEffect(() => {
        const getClientSecret = async() => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${total*100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [total]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            setSucceeded(true);
            setError(null);
            setProcessing(false);
        })
    }

    const handleChange = (e) => {
        
        setError(e.error ? e.error.message: "");
    }


  return (
    <div className="checkout"> 
        <hi className="checkout-user">Hello, {user?.email}</hi>
        <h6 className="checkout-total">Your total is ${total + 5}</h6>
        <form onSubmit={handleSubmit}>
            <CardElement  value="" onChange={handleChange}  className="cardElement"/>
            <div className='payment__priceContainer'>
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                        <h3>Order Total: {value}</h3>
                        </>
                    )}
                    decimalScale={2}
                    value={total + 5}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
                 <button className="payment__button" disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p>: 
                        "Buy Now"}</span>
                </button>
                {error && <div>{error}</div>}
            </div>
        </form>

    </div>
  )
}

export default Checkout;