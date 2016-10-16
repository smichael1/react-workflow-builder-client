import axios from 'axios';


export const FETCH_DATAMODEL_ELEMENTS = 'FETCH_DATAMODEL_ELEMENTS';
export const FETCH_DATAMODEL_ELEMENT = 'FETCH_DATAMODEL_ELEMENT';
export const CREATE_DATAMODEL_ELEMENT = 'CREATE_DATAMODEL_ELEMENT';
export const DELETE_DATAMODEL_ELEMENT = 'DELETE_DATAMODEL_ELEMENT';

export const FETCH_DATA_TYPES = "FETCH_DATA_TYPES";
export const FETCH_UNITS = "FETCH_UNITS";


const ROOT_URL = 'http://localhost:3000/api';



export function fetchDataTypes() {

    const request = axios.get(`${ROOT_URL}/enums/datatypes`);
    
    return {
        type: FETCH_DATA_TYPES,
        payload: request
    };
}

export function fetchUnits() {

    const request = axios.get(`${ROOT_URL}/enums/units`);
    
    return {
        type: FETCH_UNITS,
        payload: request
    };
}
export function fetchDataModelElements() {

    const request = axios.get(`${ROOT_URL}/datamodel/elements`);
    
    return {
        type: FETCH_DATAMODEL_ELEMENTS,
        payload: request
    };
}

export function createDataModelElement(props, metadata) {

    var element = {
        name: props.name,
        shortDesc: props.shortDesc,
        longDesc: props.longDesc,
        units: metadata.unitsEnum.find(candidate => candidate.id == props.units),
        dataType: metadata.dataTypesEnum.find(candidate => candidate.id == props.dataType)
    };

    console.log(element);
    const request = axios.post(`${ROOT_URL}/datamodel/elements/add`, element);
    return {
        type: CREATE_DATAMODEL_ELEMENT,
        payload: request
    };
}

export function fetchDataModelElement(id) {
    const request = axios.get(`${ROOT_URL}/datamodel/elements/${id}`);

    return {
        type: FETCH_DATAMODEL_ELEMENT,
        payload: request
    }
}

export function deleteDataModelElement(id) {

    console.log('in delete action');
    console.log(id);

    const request = axios.delete(`${ROOT_URL}/datamodel/elements/${id}`);

    return {
       type: DELETE_DATAMODEL_ELEMENT,
       payload: request
    };
}