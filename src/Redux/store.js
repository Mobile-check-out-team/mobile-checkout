import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import invoiceReducer from './invoiceReducer';
import geoReducer from './geoReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer,
    invoiceReducer: invoiceReducer,
    geoReducer: geoReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));