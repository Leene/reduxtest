import { BUG_ADDED, BUG_REMOVED } from './actionTypes'
//oder bei sehr vielen ActionTypes:
// import * as actions from './actionTypes'

let lastId = 0

export default function reducer (state =[], action) { // =[] leeres Array dient als initial State damit der store anfangs nicht undefiend ist 
    if (action.type === BUG_ADDED)
    return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];

else if (action.type === BUG_REMOVED)
    return state.filter(bug => bug.id !==action.payload.id) // alle bug außer der mit gegebener Id 

    return state // aktueller State falls filtern nicht klappt, ohne diese Zeile würde app bei filterproblem haken

}