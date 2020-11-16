import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import invoiceReducer from './invoiceReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer,
    invoiceReducer: invoiceReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));