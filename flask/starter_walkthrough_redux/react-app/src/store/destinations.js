const LOAD ='destinations/LOAD'
const CREATE='destinations/CREATE'
const DELETE = 'destinations/DELETE';
const EDIT = 'destinations/EDIT';

const load = (destinations)=>({
    type:LOAD,
    destinations
})

const create = (destinations)=>({
    type:CREATE,
    destinations
})

const deleter = (destinations)=>({
    type: DELETE,
    destinations
})

const edit = (destinations)=>({
    type:EDIT,
    destinations
})


export const getAllDestinations = () => async (dispatch) => {
    const res= await fetch('/api/destinations/')

    if (res.ok){
        const destinations = await res.json()
        dispatch(load(destinations))
        return destinations
    }
}

export const createDestination = (destination) => async (dispatch) => {
    const res = await fetch(`/api/destinations/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(destination)

    });
    if(res.ok){
        const destination = await res.json();
        dispatch(create(destination));
        return destination;
    }
};

export default function destinationReducer(state={}, action){
    let newState;
    switch(action.type){
        case LOAD:
            newState = Object.assign({}, state);
            newState.destinations = action.destinations;
            return action.destinations
        case CREATE:
            newState = Object.assign({}, state);
            newState.newDestination = action.newDestination;
            return newState;
        default:
            return state;
    }
}
