const initialState = {
    geo:{}
}

const REVERSE_GEO = 'REVERSE_GEO';
const TAX_RATE = 'TAX_RATE';

export function geoLocation(geoObj){
    console.log(geoObj)
    return {
        type: REVERSE_GEO,
        payload: geoObj
    }
}



export default function reducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case REVERSE_GEO:
            return {...state, geo: payload}
        default:
            return state;
    }
}
