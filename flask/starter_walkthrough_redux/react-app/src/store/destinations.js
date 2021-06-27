const GET_ALL='destinations/GET_ALL'
const GET_ONE='destinations/GET_ONE'


const getAll= (destinations)=>({
    type:GET_ALL,
    destinations:destinations
})

const getOne = (destination)=>({
    type:GET_ONE,
    destination:destination,
})



export const getAllDestinations = () => async (dispatch) => {
    const res= await fetch('/api/destinations/')

    if (res.ok){
        const data = await res.json()
        dispatch(getAll(data))
    }
}


export const getOneDestination = (id) => async (dispatch) => {
    const res = await fetch(`/api/destinations/${id}`)

    if (res.ok){
        const data = await res.json()
        dispatch(getOne(data))
    }
}



export default function destinationReducer(state={}, action){
    let newState={}
    switch(action.type){
        case GET_ALL:
            action.destinatons.destinations.forEach(destination=>{
                newState[destination.id]=destination
            })
            return newState
        case GET_ONE:
            newState[action.destination.id]=action.destination
            return newState
        default:
            return state;
    }
}
