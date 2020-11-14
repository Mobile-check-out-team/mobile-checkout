import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getCart} from '../Redux/cartReducer';
import axios from 'axios';
import '../Style/Checkout.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements,
        useStripe, 
        useElements, 
        CardNumberElement,
        CardExpiryElement,
        CardCvcElement,
        PaymentRequestButtonElement,
        CardElement} from '@stripe/react-stripe-js';
// import { Card } from 'semantic-ui-react';

const stripePromise = loadStripe("pk_test_51HdVx7GwZEaH5JVh0j5mSh6bwTYCmFN50iYTpTTtqZLjRYLyi0i9M5ZRmOcMXNU2TGN6XhZAS5YMBsUBZs6ZmIkO00KEZ8tkIo");

const CheckoutForm = (props) => {
    const [state, cState] = useState({
        firstName: '',
        lastName: '',
        // address: '',
        // zip: ''
    });

    const handleInput = (event) => {
        cState({...state, [event.target.name]: event.target.value})
    }

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        
        if (!error) {
          const { id } = paymentMethod;

    
          try {
            const amount = props.amount;
            const response = await axios.post('/api/charge', {id, amount})
            props.success();
            console.log(response);
          } catch (error) {
            console.log(error)
          }
        }
      };

    return(
        <form onSubmit={handleSubmit} className='checkout-form'>

            {/* <CardNumberElement />
            <CardExpiryElement />
            <CardCvcElement /> */}
            <CardElement />
            <div className='name-flex'>
                <input 
                    className="first-name"
                    type="text"
                    value={state.firstName}
                    name="firstName"
                    onChange={(e) => handleInput(e)}
                    placeholder="First name"
                    />
                <input 
                    className="last-name"
                    type="text"
                    value={state.lastName}
                    name="lastName"
                    onChange={(e) => handleInput(e)}
                    placeholder="Last name"
                    />
            </div>
            <button className='pay-button' type="submit" disabled={!stripe}>Pay</button>
        </form>
    )
}

const Checkout = (props) => {
    const [status, setStatus] = useState('');
    
    if (status === "success"){
        // return <div>Congrats on your purchase</div>
        props.history.push('/ExitPass')
    }
    const amount = props.cartReducer.totalPrice * 100;
    const success = () => {
        setStatus('success')
    }
    
    let subtotal = props.cartReducer.cart.reduce((acc, el) => {
        const sum = el.price * el.qty;
        return acc + sum;
        }, 0)
    let tax = subtotal*.0825
    let total = subtotal + tax
        
    
    return(
        <div>
            <header className="checkout-header">
                <p className="checkout-exit"  onClick={() => {
                    props.history.push("/cart")
                }}>Back</p>
                <p className="checkout-title">Checkout</p>
                <button className="checkout-faq">?</button>
            </header>
            <div className='summary-title'>Summary</div>
            <section className='summary-box'>
                <div className='inner-summary-box'>
                    <div className='subtotal'>
                        <span>Subtotal ({props.cartReducer.cart.reduce((acc, el) => {
                            return acc + el.qty;}, 0)} items)</span>
                        <span>${props.cartReducer.cart.reduce((acc, el) => {
                            const sum = el.price * el.qty;
                            return acc + sum;
                        }, 0)}</span>
                    </div>
                    <div className='tax'>
                        <span>Tax</span>
                        <span>{tax.toFixed(2)}</span>
                    </div>
                    <div className='total'>
                        <span>Total</span>
                        <span>{total.toFixed(2)}</span>
                    </div>
                </div>


            </section>

            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    success={success}
                    amount={amount}/>
                    

            </Elements>
        </div>
        )
    }


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Checkout);
