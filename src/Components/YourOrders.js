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
        getOrders();
    },[])

    const getOrders = () => {
        axios.get('/api/orders')
        .then(res => sState({...state, orders: res.data}))
        .catch(err => console.log('get entry request failed'))
    }
    console.log(state.orders)
    let mappedOrders = state.orders.map( el => {
        let date = new Date(el.invoice_date)
        return (
            <Link className='order-fl' to={`/entry/${el.user_id}`} key={el.user_id} > 
                <div className='order'>
                    <div className='order-title'>
                        <p>{date.toDateString().split(' ').slice(1).join(' ')}</p>

                    </div>
                    <p>{el.invoice_number}</p>
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
            <div className='menu-user'>{props.authReducer.user.first_name}'s Orders</div>
            <div className='order-flex'>
                {mappedOrders}
            </div>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {})(YourOrders);