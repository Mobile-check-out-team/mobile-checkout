import axios from 'axios';

const initialState = {
    cart:{}
};

const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const CLEAR_CART = 'CLEAR_CART';

export function getCart(){
    return{
        type: GET_CART,
        payload: initialState
    }
}

export function updateCart(data){
    let invObj = axios.get(`/api/getItem/${data}`)
    return{
        type: UPDATE_CART,
        payload: invObj
    }
}


export function clearCart(){
    return{
        type: CLEAR_CART,
        payload: []
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_CART:
            return {...state, user: payload}

        case UPDATE_CART + '_PENDING':
            return state ;
        case UPDATE_CART + '_FULFILLED':
            return {...state, cart: payload}
        case UPDATE_CART + '_REJECTED':
            return state;

        case CLEAR_CART:
            return {...state, user: payload}
        default:
            return state;
    }
}