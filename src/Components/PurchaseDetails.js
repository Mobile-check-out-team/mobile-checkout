import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useBarcode } from "@createnextapp/react-barcode";
import '../Style/PurchaseDetails.scss'

function PurchaseDetails(props) {
    const [state, sState] = useState({
        order: [],
        date: '',
        taxRate: '',
        invoiceNum: ''
    })
    useEffect(()=> {
        const {invoiceNumber} = props.match.params;
        axios
        .get(`/api/orders/single/${invoiceNumber}`)
        .then(res => {
             sState({...state, 
                order: res.data, 
                date: res.data[0].invoice_date,
                taxRate: res.data[0].tax_rate,
                invoiceNum: res.data[0].invoice_number})

         })
        .catch(err => console.log(err.request));
    },[])
    
    const { inputRef } = useBarcode({
        value:`INV# ` + state.invoiceNum.toString().padStart(14, "0") ,
        options: {
        background: "white",
        width: 1,
        height: "20",
        fontSize: '0',
        margin: 0,
        flat: true
        },
    });
    let formattedDate = new Date(state.date)
    formattedDate = formattedDate.toDateString()
    let subtotalAmount = state.order.reduce((acc, el) => {
        const sum = el.price * el.quantity_purchased;
        return acc + sum;
    }, 0)
    subtotalAmount = subtotalAmount.toFixed(2)
    let taxAmount = subtotalAmount * state.taxRate
    let total = +subtotalAmount + +taxAmount;

    let numItems = state.order.reduce((acc, el) => {
        return acc + el.quantity_purchased;}, 0)
    return (
        <div>
                <div className='Purchase-Details'>
                    <header className="purchase-details-header">
                        <p className="purchase-details-exit"  onClick={() => {
                            props.history.push("/orders")
                        }}>Back</p>
                        <p className="purchase-details-title">Purchase Details</p>
                        <button className="purchase-details-faq">?</button>
                    </header>
                    <p className='purchase-details-date'> Purchased on {formattedDate}</p>
                    
                    <section className="mapped-order">
                        {state.order.map((el, i) => {
                        return (
                            <div className="order-indiv-item" key={i}>
                               
                                <img className="order-item-img" src={el.img_url} />
                                
                                <div className="order-item-descrip-box">
                                    <p className="order-item-description-title">{el.description}</p>                                   
                                    <p className="qty-text">Qty {el.quantity_purchased}</p>
                                    {el.quantity_purchased===1?
                                    <p><strong>$ {el.price * el.quantity_purchased}</strong></p>:   
                                    <p><strong>$ {el.price * el.quantity_purchased}</strong> (${el.price} each)</p>}                               
                                </div>
                            </div>
                        )})}
                    </section>

                    <section className='receipt-summary'>
                        <span className='receipt-summary-title'>
                            Receipt Summary
                        </span>
                        <div className='receipt-summary-details'>
                            <div className='receipt-summary-subtotal'>
                                <span>Subtotal ({numItems} items)</span>
                                <span>$ {subtotalAmount}</span>
                            </div>
                            <div className='receipt-summary-tax'>
                                <span>Tax {state.taxRate*100}%</span>
                                <span>$ {taxAmount.toFixed(2)}</span>
                            </div>
                            <div className='summary-line'></div>
                            <div className='receipt-summary-total'>
                                <span>Total</span>
                                <span>$ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </section>

                    <section className='receipt-barcode'>
                        <span className='receipt-barcode-title'>
                            <strong>Returns are easy</strong>
                        </span>
                        <div className='receipt-barcode-details'>
                            <div className='receipt-barcode-flex'>
                                <span>Bring this barcode to Customer Service</span>
                            </div>
                            <div className='summary-line'></div>
                            <div className='invoice-number'>
                                <span>Invoice # {state.invoiceNum.toString().padStart(14, "0")}</span>
                            </div>
                            <div>
                            <img ref={inputRef} className='receipt-barcode-display'/>
                            </div>
                        </div>
                    </section>
                    <br></br>
                </div>
            </div>
    
    )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(PurchaseDetails);