const initialState = {
    invoice:{}
}

const CREATE_INVOICE = 'CREATE_INVOICE';

export function createInvoice(invoiceObj){
    console.log(invoiceObj)
    return {
        type: CREATE_INVOICE,
        payload: invoiceObj
    }
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case CREATE_INVOICE:
            return {...state, invoice: payload}
        default:
            return state;
    }
}
