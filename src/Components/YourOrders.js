import React, {useState, useEffect, useLayoutEffect} from 'react';
import axios from 'axios'
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';



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
        return (
            <Link className ='menu-link' to={`/entry/${el.user_id}`} key={el.user_id} > 
                <div className='menu-entry'>
                    <span>{el.invoice_number}</span>
                    <span>{el.invoice_date}</span>
                </div>
            </Link>)})


    return (
        <div {...props}>
            <div className='menu-user'>{props.authReducer.user.first_name}'s Orders</div>
            {/* <Link className='menu-new-entry' to='/new'><img className='menu-new-entry-icon' src={props.darkModeReducer.darkMode.data?newEntryLogoDarkMode:newEntryLogo} alt='New Entry' /> New Entry</Link>
            <Link className='menu-view-all' to='/dashboard'><img className='menu-view-all-icon' src={props.darkModeReducer.darkMode.data?viewAllDarkMode:viewAll} alt='home' />View All Entries</Link> */}
            <div className='entry-flex'>
                {mappedOrders}
            </div>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {})(YourOrders);