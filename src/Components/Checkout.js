import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createInvoice} from '../Redux/invoiceReducer'
import {clearCart} from '../Redux/cartReducer';
import { Dropdown } from "semantic-ui-react";
import axios from 'axios';
import '../Style/Checkout.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements,
        useStripe, 
        useElements, 
        CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51HnAsxBVqNhvgNKpHpXeX70jTGwWd3nCOQJCnj9kDg841l7RMw22lfPaufCcWZlym5fPz1THpJSRyB2YkwbIbnXR002HRpV39x");

/////////////////////////////////////////////////////////////////
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
        color: '#000000',
        fontFamily: 'sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
        },
        invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
        }
    }
    };
    ///////////
const CheckoutForm = (props) => {
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const [state, cState] = useState({
        firstName: '',
        lastName: '',
        address: '',
        line2: '',
        city: '',
        state: '',
        zip: ''
    });
    const handleFocus = () => {
        console.log('[focus]')
    };
    const handleChange = (event) => {
        if (event.error) {
          setError(event.error.message);
        } else {
            setError(null);
        }
      }
    const handleInput = (event) => {
        cState({...state, [event.target.name]: event.target.value})
    }
    const stateOptions = [
        { key: 1, text: 'AL', value: 'AL' },
        { key: 2, text: 'AK', value: 'AK' },
        { key: 3, text: 'AS', value: 'AS' },
        { key: 4, text: 'AZ', value: 'AZ' },
        { key: 5, text: 'AR', value: 'AR' },
        { key: 6, text: 'CA', value: 'CA' },
        { key: 7, text: 'CO', value: 'CO' },
        { key: 8, text: 'CT', value: 'CT' },
        { key: 9, text: 'DE', value: 'DE' },
        { key: 10, text: 'DC', value: 'DC' },
        { key: 11, text: 'FM', value: 'FM' },
        { key: 12, text: 'FL', value: 'FL' },
        { key: 13, text: 'GA', value: 'GA' },
        { key: 14, text: 'GU', value: 'GU' },
        { key: 15, text: 'HI', value: 'HI' },
        { key: 16, text: 'ID', value: 'ID' },
        { key: 17, text: 'IL', value: 'IL' },
        { key: 18, text: 'IN', value: 'IN' },
        { key: 19, text: 'IA', value: 'IA' },
        { key: 20, text: 'KS', value: 'KS' },
        { key: 21, text: 'KY', value: 'KY' },
        { key: 22, text: 'LA', value: 'LA' },
        { key: 23, text: 'ME', value: 'ME' },
        { key: 24, text: 'MH', value: 'MH' },
        { key: 25, text: 'MD', value: 'MD' },
        { key: 26, text: 'MA', value: 'MA' },
        { key: 27, text: 'MI', value: 'MI' },
        { key: 28, text: 'MN', value: 'MN' },
        { key: 29, text: 'MS', value: 'MS' },
        { key: 30, text: 'MO', value: 'MO' },
        { key: 31, text: 'MT', value: 'MT' },
        { key: 32, text: 'NE', value: 'NE' },
        { key: 33, text: 'NV', value: 'NV' },
        { key: 34, text: 'NH', value: 'NH' },
        { key: 35, text: 'NJ', value: 'NJ' },
        { key: 36, text: 'NM', value: 'NM' },
        { key: 37, text: 'NY', value: 'NY' },
        { key: 38, text: 'NC', value: 'NC' },
        { key: 39, text: 'ND', value: 'ND' },
        { key: 40, text: 'MP', value: 'MP' },
        { key: 41, text: 'OH', value: 'OH' },
        { key: 42, text: 'OK', value: 'OK' },
        { key: 43, text: 'OR', value: 'OR' },
        { key: 44, text: 'PW', value: 'PW' },
        { key: 45, text: 'PA', value: 'PA' },
        { key: 46, text: 'PR', value: 'PR' },
        { key: 47, text: 'RI', value: 'RI' },
        { key: 48, text: 'SC', value: 'SC' },
        { key: 49, text: 'SD', value: 'SD' },
        { key: 50, text: 'TN', value: 'TN' },
        { key: 51, text: 'TX', value: 'TX' },
        { key: 52, text: 'UT', value: 'UT' },
        { key: 53, text: 'VT', value: 'VT' },
        { key: 54, text: 'VI', value: 'VI' },
        { key: 55, text: 'VA', value: 'VA' },
        { key: 56, text: 'WA', value: 'WA' },
        { key: 57, text: 'WV', value: 'WV' },
        { key: 58, text: 'WI', value: 'WI' },
        { key: 59, text: 'WY', value: 'WY' },
      ]
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: `${state.firstName} ${state.lastName}`,
                email: props.email,
                address: {
                    city: state.city,
                    state: state.state,
                    line1: state.address,
                    line2: state.line2,
                    postal_code: state.zip,
                }
            }
        });
        
        if (!error) {
          const { id } = paymentMethod;

          try {
            const amount = props.amount;
            const response = await axios.post('/api/charge', {id, amount})
            props.success();
            console.log(response);
          } catch (error) {
              alert(error.message)
          }
        }
      };

    return(
        <section className='outer-form'>
            <p className='form-title'>Pay with card</p>
            <form onSubmit={handleSubmit} className='checkout-form'>

                <div className='name-flex'>
                    <input 
                        className="first-name"
                        type="text"
                        value={state.firstName}
                        name="firstName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Jane"
                        required
                        />
                    <input 
                        className="last-name"
                        type="text"
                        value={state.lastName}
                        name="lastName"
                        onChange={(e) => handleInput(e)}
                        placeholder="Doe"
                        required
                        />
                </div>
                <input 
                    className="address"
                    type="text"
                    value={state.address}
                    name="address"
                    onChange={(e) => handleInput(e)}
                    placeholder="1234 Address St."
                    required
                />
                <input 
                    className="line2"
                    type="text"
                    value={state.line2}
                    name="line2"
                    onChange={(e) => handleInput(e)}
                    placeholder="Apt/Suite"
                    
                />
                <div className="addressInfo">
                    <input 
                        className="city"
                        type="text"
                        value={state.city}
                        name="city"
                        onChange={(e) => handleInput(e)}
                        placeholder="Salt Lake City"
                        required
                    />
                    <Dropdown
                        className="state"
                        scrolling
                        value={state.state}
                        options={stateOptions}
                        placeholder='UT'
                        onChange={(e, data) => {
                            cState({...state, state: data.value});
                        }}
                        required
                    />
                    <input 
                        className="zip"
                        type="text"
                        value={state.zip}
                        name="zip"
                        onChange={(e) => handleInput(e)}
                        placeholder="84101"
                        required
                    />
                </div>  
                <CardElement 
                    onFocus={handleFocus}
                    id='card-element'
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleChange}
                />

                <div className="card-errors" role="alert">{error}</div>

                <button className='pay-button' type="submit" disabled={!stripe}>Pay</button>
            </form>
        </section>
    )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Checkout = (props) => {
    const [date, setDate] = useState(new Date());
    const [taxRate, setTaxRate] = useState();
    const zipCode = props.geoReducer.geo.zipcode
    useEffect(() => {
        axios
            .post('/api/taxRate', {zipCode})
            .then(res => setTaxRate(res.data))
            .catch(err => console.log(err))
    },[])
    
    let subtotal = props.cartReducer.cart.reduce((acc, el) => {
        const sum = el.price * el.qty;
        return acc + sum;
    }, 0)
    let taxR
    {taxRate?taxR = taxRate.rate.combined_rate:taxR = .06}
    
    let tax = subtotal * +taxR;
    let total = subtotal + tax;
    let numItems = props.cartReducer.cart.reduce((acc, el) => {
        return acc + el.qty;}, 0)
        
    const addPurchasedItems = (invoiceNumber) => {
        const cartArray = props.cartReducer.cart
        axios
        .post('/api/purchasedItem', {cartArray, invoiceNumber})
        .then(res => {
            props.clearCart()
        })
        .catch(err => console.log(err))
    }
    
    const createInv = () =>  {
        const {user_id} = props.authReducer.user
        axios
        .post('/api/invoice', {user_id, date, total, numItems, taxR})
        .then(res => {
            props.createInvoice(res.data)
            addPurchasedItems(res.data.invoice_number)
            props.history.push('/ExitPass')
        })
        .catch(err => console.log(err))
    }
    const [status, setStatus] = useState('');
    useEffect(()=>{
        if (status === "success"){
            createInv()
        }
    },[status])
        
    const amount = props.cartReducer.totalPrice * 100;
    
    const success = () => {
        setStatus('success')
    }
    
    return(
        <div className="Checkout">
            <header className="checkout-header">
                <p className="checkout-exit"  onClick={() => {
                    props.history.push("/cart")
                }}>Back</p>
                <p className="checkout-title">Checkout</p>
                <button className="checkout-faq">?</button>
            </header>
            <p className='summary-title'>Summary</p>
            <section className='summary-box'>
                <div className='inner-summary-box'>
                    <div className='subtotal'>
                        {numItems === 1?
                        <span>Subtotal ({numItems} item)</span>:
                        <span>Subtotal ({numItems} items)</span>}
                        <span>${props.cartReducer.cart.reduce((acc, el) => {
                            const sum = el.price * el.qty;
                            return acc + sum;
                        }, 0)}</span>
                    </div>
                    <div className='tax'>
                        <span>Tax ({taxR*100}%)</span>
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
                    amount={amount}
                    email={props.authReducer.user.email}/>
            </Elements>
    </div>
    )
}


const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, {createInvoice, clearCart})(Checkout);
