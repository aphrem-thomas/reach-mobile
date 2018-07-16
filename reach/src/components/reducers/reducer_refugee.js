import initState from './refugeeInitialState.js';
import docState from './doctorInitialState.js';
import dependentInt from './dependentInitState.js';

export function refreshUpdate(state=initState, action){
    switch(action.type){
        case 'REFRESH':{
            let newState=action.payload;
            return newState;
        };break;
        case 'EMPTYREFUGEE':{
            console.log("inside EMPTYREFUGEE");
            return initState;
        };break;
        default: return state;
    }
}

export function dependentRecord(state=dependentInt,action){
    switch(action.type){
        case 'ADDDEPENDENT':{
            return [...state,action.payload]
        }
        case 'EMPTYDEPENDENT':{
            console.log("inside EMPTYDEPENDENT");
            return dependentInt
        }
        default : return state;
    }
}

export function refugeeIdField(state="Like rf123233",action){
    switch(action.type){
        case 'REFFIELD':{
            let newState=action.payload;
            return newState;
        }
        default:return state;
    }
}

export function dependentPage(state=false,action){
    switch(action.type){
        case 'SETDEPENDENTPAGE':{
            return true;
        }break;
        case 'RESETDEPENDENTPAGE':{
            return false;
        }break;
        default:return state;
    }
}

export function guardian(state=null,action){
    switch(action.type){
        case 'GUARDIAN':{
            console.log("inside guardian reducer");
            console.log("action.payload is "+ action.payload);
            return action.payload;
        }break;
        default:return state;
    }
}


export function physicianIdField(state="Like Dr_Adel",action){
    switch(action.type){
        case 'PHYFIELD':{
            let newState=action.payload;
            return newState;
        }
        default:return state;
    }
}

export function doctorDetails(state=docState,action){
    switch(action.type){
        case 'DOC_DTL':{
            let newState=action.payload;
            return newState;
        };break;
        case 'EMPTYPHYSICIAN':{
            console.log("inside EMPTYPHYSICIAN");
            return docState;
        };break;
        default:return state;
    }
}

