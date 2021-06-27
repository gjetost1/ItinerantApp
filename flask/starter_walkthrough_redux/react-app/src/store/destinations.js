const GET_ALL='destinations/GET_ALL'
const GET_ONE='destinations/GET_ONE'


const getAll= (destinations)=>({
    type:GET_ALL,
    destinations
})

const getOne = (destination)=>({
    type:GET_ONE,
    destination
})



export const getAllDestinations = () => async (dispatch) => {
    const res= await fetch('/api/destinations/')

    if (res.ok){
        const destinations = await res.json()
        dispatch(getAll(destinations))
        return destinations
    }
}


// export const getOneDestination = (id) => async (dispatch) => {
//     const res = await fetch(`/api/destinations/${id}`)

//     if (res.ok){
//         const destination = await res.json()
//         dispatch(getOne(destination))
//     }
// }



export default function destinationReducer(state={}, action){
    let newState={}
    switch(action.type){
        case GET_ALL:
            newState = Object.assign({}, state);
            newState.destinations = action.destinations;
            return action.destinations
        // case GET_ONE:
        //     newState[action.destination.id]=action.destination
        //     return newState
        default:
            return state;
    }
}
