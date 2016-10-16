import { FETCH_DATAMODEL_ELEMENTS, FETCH_DATAMODEL_ELEMENT, FETCH_DATA_TYPES, FETCH_UNITS } from '../actions/index';

const INITIAL_STATE = {
    dataTypes: [], // all data types
    units: [], // all units
    all: [], // all elements
    element: null // current element
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_DATA_TYPES:
            return { ...state, dataTypes: action.payload.data};
        case FETCH_UNITS:
            return { ...state, units: action.payload.data};
        case FETCH_DATAMODEL_ELEMENT:
            return { ...state, element: action.payload.data};
        case FETCH_DATAMODEL_ELEMENTS:
            return { ...state, all: action.payload.data };
         default:
            return state;
    }
}