
let lastId = 0

function reducer (state =[], action) { // =[] leeres Array dient als initial State damit der store anfangs nicht undefiend ist 
    if (action.type === 'bugAdded')
    return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];

else if (action.type === 'bugRemoved')
    return state.filter(bug => bug.id !==action.playload.id) // alle bug außer der mit gegebener Id 

    return state // aktueller State falls filtern nicht klappt, ohne diese Zeile würde app bei filterproblem haken

}