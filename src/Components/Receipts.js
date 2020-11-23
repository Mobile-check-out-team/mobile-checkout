import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';




function Receipts(props) {
    const [state, sState] = useState({
        order: []
    })
      useEffect(()=> {
            getReceipt();
    },[])

    
    const getReceipt = () => {
        const {invoiceNumber} = props.match.params;
        axios
           .get(`/api/orders/single/${invoiceNumber}`)
            .then(res => {
                sState({...state, order: res.data})
                // sState({...state,
                //         invoice: res.data.invoice,
                //         date: res.data.date,
                //         img_url: res.data.img_url,
                //         price: res.data.price })
            })
        .catch(err => console.log(err.request));
    }
    
    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    } 
 
    return (
        <div>
                <div className='Purchase-Details'>Receipt
                    
                    {/* <section className='up-title-header'>
                        <div
                            className ='up-title-input'
                            name='title'
                            placeholder='Entry Title'
                            value={state.title}
                            onChange={handleInput}/>     
                    </section> */}

                   
                </div>
            </div>
    
    )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Receipts);