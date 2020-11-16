import React, { useState } from "react";
import { useBarcode } from "@createnextapp/react-barcode";
import {connect} from 'react-redux';
import '../Style/ExitPass.scss'

function ExitPass(props) {
  const { inputRef } = useBarcode({
    value: props.invoiceReducer.invoice.invoice_number.toString().padStart(14, "0"),
    options: {
    background: "white",
    },
  });
  let date = new Date(props.invoiceReducer.invoice.invoice_date)
  let total = +props.invoiceReducer.invoice.total
  
  return (
    <header className='exit-body'>
      
      <div className='exit-head'>
        <p>Exit Pass </p>
      </div>
       <p className='exit-page'>Done</p>
    <div className='bar-code-box'>
         <p className='bar-pass'>Exit Pass </p>
      <div className='name-date'>
         <span className='name'>{props.authReducer.user.first_name} {props.authReducer.user.last_name}</span>
         <span className='date'>{date.toDateString()} </span>
      </div>
      <div className='total-item'>
         <span className='totalAmount'>Total ${total.toFixed(2)} </span>
         {props.invoiceReducer.invoice.numitems === 1?
         <span className='itemTotal'>{props.invoiceReducer.invoice.numitems} item</span>:
         <span className='itemTotal'>{props.invoiceReducer.invoice.numitems} items</span>}
      </div>
      <div className='bar-code'>
      <img ref={inputRef} className='exit-pass-barcode'/>
      </div>
    </div>
    
    </header>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, null)(ExitPass);
