import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../Style/YourOrders.scss'

function YourOrders(props) {
    const [state, sState] = useState({
        invoice: '',
        orders: []   
    })
    useEffect(()=> {
        axios.get('/api/orders')
        .then(res => sState({...state, orders: res.data}))
        .catch(err => console.log('get entry request failed'))
    },[])

    let mappedOrders = state.orders.map( el => {
        let date = new Date(el.invoice_date)
        return (
            <Link className='order-fl' to={`/purchaseDetails/${el.invoice_number}`} key={el.invoice_number} > 
                <div className='order'>
                    <div className='order-title'>
                        <span>Purchase on {date.toDateString().split(' ').slice(1).join(' ')}</span>
                        <span className='chevron-right'>&#8250;</span>
                    </div>
                    <img className="purchase-history-img" src={el.img_url} />
                </div>
            </Link>)})


    return (
        <div {...props}>
            <header className="purchase-history-header">
                <p className="purchase-history-exit"  onClick={() => {
                    props.history.push("/instructions")
                }}>Back</p>
                <p className="purchase-history-title">Purchase History</p>
                <button className="purchase-history-faq">?</button>
            </header>
            <div className='order-flex'>
                {mappedOrders}
            </div>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {})(YourOrders);