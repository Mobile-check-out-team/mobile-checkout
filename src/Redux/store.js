import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import cartReducer from './cartReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));