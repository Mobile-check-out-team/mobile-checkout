import React from "react";
import { useBarcode } from "@createnextapp/react-barcode";
import {connect} from 'react-redux';
import '../Style/ExitPass.scss'
import { clearCart } from "../Redux/cartReducer";
import { clearUser } from "../Redux/authReducer";


function ExitPass(props) {
  const { inputRef } = useBarcode({
    value:`INV# ` + props.invoiceReducer.invoice.invoice_number.toString().padStart(14, "0"),
    options: {
    background: "white",
    width: 1,
    height: "40",
    fontSize: '10',
    },
  });
  let date = new Date(props.invoiceReducer.invoice.invoice_date)
  let total = +props.invoiceReducer.invoice.total
  
  return (
    <div className='exit-pass-cont'>
      <header className='exit-body'>
        <div className='exit-head'>
          <p>Exit Pass </p>
          <p className='exit-page'  onClick={() => {
            props.clearUser()
            props.clearCart()
            props.history.push('/')
          }}>Done </p>
        </div>

        <p className ='thank-you-message'>Thanks for using <br/> Scan & Go!</p>
        <div className='bar-code-box'>
          <div className='pass-date'>
            <span className='bar-pass'>Exit Pass </span>
            <span className='date'>{date.toDateString().split(' ').slice(1).join(' ')} at {date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})} </span>
          </div>
          <span className='name'>{props.authReducer.user.first_name} {props.authReducer.user.last_name}</span>
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
    </div>
  );
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, {clearCart, clearUser})(ExitPass);
