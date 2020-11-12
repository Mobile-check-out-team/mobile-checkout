import axios from "axios";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const UPDATE_CART = "UPDATE_CART";

export function updateCart(newArr) {
  return {
    type: UPDATE_CART,
    payload: newArr,
  };
}

export function getCart() {
  return {
    type: GET_CART,
    payload: initialState,
  };
}

export function addToCart(data) {
  let invObj = axios.get(`/api/getItem/${data}`);
  return {
    type: ADD_TO_CART,
    payload: invObj,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
    payload: [],
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    ////////// GET_CART /////////////
    case GET_CART:
      return { ...state, cart: payload };

    ///////// UPDATE_CART ///////////
    case UPDATE_CART:
      return state;

    /////////// ADD_TO_CART ////////////
    case ADD_TO_CART + "_PENDING":
      return state;
    case ADD_TO_CART + "_FULFILLED":
      return { ...state, cart: [...state.cart, { ...payload.data, qty: 1 }] };
    case ADD_TO_CART + "_REJECTED":
      return state;

    ////////// CLEAR_ CART ////////////
    case CLEAR_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
}
