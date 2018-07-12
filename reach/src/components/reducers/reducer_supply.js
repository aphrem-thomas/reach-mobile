import bloodState from './bloodInitialState.js';
import medicineState from './medicineInitialState.js';
import vaccineState from './vaccineInitialState.js';
import syringeState from './syringeInitialState.js';
import vendorState from './vendorInitialState.js';

export function refresh_vaccine(state=vaccineState, action){
    switch(action.type){
        case 'REFRESH_VACCINE':{
            let newState=action.payload;
            return newState;
        }
        default: return state;
    }
}

export  function refresh_medicine(state=medicineState, action){
    switch(action.type){
        case 'REFRESH_MEDICINE':{
            let newState=action.payload;
            return newState;
        }
        default: return state;
    }
}

export  function refresh_blood(state=bloodState, action){
    switch(action.type){
        case 'REFRESH_BLOOD':{
            let newState=action.payload;
            return newState;
        }
        default: return state;
    }
}

export  function refresh_syringe(state=syringeState, action){
    switch(action.type){
        case 'REFRESH_SYRINGE':{
            let newState=action.payload;
            return newState;
        }
        default: return state;
    }
}

export function VendorDetails(state=vendorState, action){
    switch(action.type){
        case 'REFRESH_VENDOR':{
            let newState=action.payload;
            return newState;
        }
        default: return state;
    }
}