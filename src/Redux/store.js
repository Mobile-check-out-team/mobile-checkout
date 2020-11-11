// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import promiseMiddleware from 'redux-promise-middleware'
// import cartReducer from './cartReducer'
// import authReducer from './authReducer'


// const rootReducer = combineReducers({
//   cart: cartReducer, 
//   auth: authReducer
// })
// export default createStore(rootReducer, applyMiddleware(promiseMiddleware));



import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import cartReducer from './cartReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));