import React, {useState} from 'react';
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
        fullName: '',
        email: '',
        address: '',
        zip: ''
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
        <form onSubmit={handleSubmit} style={{maxWidth:'400px', margin: '0 auto' }}>
            <input 
                className="CardEmail"
                type="email"
                value={state.email}
                name="email"
                onChange={(e) => handleInput(e)}
                placeholder="email"
            />
            {/* <CardNumberElement />
            <CardExpiryElement />
            <CardCvcElement /> */}
            <CardElement />
            <input 
                className="CardFullName"
                type="text"
                value={state.fullName}
                name="fullName"
                onChange={(e) => handleInput(e)}
                placeholder="Name on Card"
            />
            <input 
                className="Address"
                type="address"
                value={state.address}
                name="address"
                onChange={(e) => handleInput(e)}
                placeholder="address"
            />
            <button type="submit" disabled={!stripe}>Pay</button>
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

    
    return(
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    success={success}
                    amount={amount}/>
                    

            </Elements>
        )
    }


const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Checkout);
