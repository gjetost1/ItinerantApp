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
    const res= await fetch('/api/destinations')

    if (res.ok){
        const destinations = await res.json()
        dispatch(load(destinations))
        return destinations
    }
}

export const getDestinationById = (destinationId) => async (dispatch) => {
    const res = await fetch(`/api/destinations/${destinationId}`);

    if (res.ok) {
        const destinations = await res.json();
        dispatch(load(destinations));
        return destinations;
    };
};

export const createDestination = (data) => async (dispatch) => {
    const res = await fetch(`/api/destinations/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

    });
    if(res.ok){
        const destination = await res.json();
        dispatch(create(destination));
        return destination;
    }
};

export const editDestination = (destinations) => async (dispatch) => {
    let destinationId=destinations.id
    console.log(destinationId,"id")
    let body = JSON.stringify(destinations)
    console.log(body,"body")
    const res = await fetch(`/api/destinations/${destinationId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: body
    });

    if (res.ok) {
        const data = await res.json();

        dispatch(edit(data));
        return destinations;
    };
};

export const deleteDestination = (destinationId) => async (dispatch) => {
    const res = await fetch(`/api/destinations/${destinationId}`, {
        method: 'DELETE'
    })

    dispatch(deleter(destinationId))
    return res;
}

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
        case EDIT:
            newState = Object.assign({}, state);
            newState.newDestination = action.newDestination;
            return newState;
        case DELETE:
            newState = Object.assign({}, state);
            newState.destinations = [];
            return newState;
        default:
            return state;
    }
}
