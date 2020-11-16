import axios from "axios";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const UPDATE_CART = "UPDATE_CART";
const UPDATE_PRICE = "UPDATE_PRICE";

export function updateTotalPrice(price) {
  return {
    type: UPDATE_PRICE,
    payload: price,
  };
}

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

export function addToCart(invObj) {
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
      return { ...state, cart: payload };

    /////////// ADD_TO_CART ////////////

    case ADD_TO_CART:
      if (state.cart.some((el) => el.inventory_id === payload.inventory_id)) {
        let i = state.cart
          .map((el) => el.inventory_id)
          .indexOf(payload.inventory_id);
        let newArray = [...state.cart];
        let currQty = newArray[i].qty;
        newArray[i] = { ...newArray[i], qty: ++currQty };
        return { ...state, cart: newArray };
      } else {
        return { ...state, cart: [...state.cart, { ...payload, qty: 1 }] };
      }

    //////////UPDATE_PRICE/////////////
    case UPDATE_PRICE:
      return { ...state, totalPrice: payload };

    ////////// CLEAR_ CART ////////////
    case CLEAR_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
}
