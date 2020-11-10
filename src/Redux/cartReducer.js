import axios from 'axios';

const initialState = {
    cart:[]
};

const GET_CART = 'GET_CART',
      UPDATE_CART = 'UPDATE_CART',
      CLEAR_CART = 'CLEAR_CART';

export function getCart(){
    return{
        type: GET_CART,
        payload: initialState
    }
}

export function updateCart(invObj){
    return{
        type: GET_CART,
        payload: invObj
    }
}

export function clearCart(invObj){
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
        case UPDATE_CART:
            return {...state, user: payload}
        case CLEAR_CART:
            return {...state, user: payload}
        default:
            return state;
    }
}