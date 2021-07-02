import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getDestinationById, deleteDestination, editDestination} from '../../store/destinations'





export default function DestinationById(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
    dispatch(getDestinationById(id))
    }, [dispatch, id])

    const destinations = useSelector((state )=> state.destinations)

    const user = useSelector(state => state.session.user)


    if (!destinations || !user) {
        return (
        <div style={{textAlign:"right"}}>no destination?</div>
        )
    }

     const handleDelete = async () => {
        await dispatch(deleteDestination(destinations.id))
        window.location=('/destinations')
    }

    const handleEdit = async () => {
        await dispatch(editDestination(destinations))
        // history.push('/destinations/create')
    }

    return (

        <div style={{textAlign:"right", margin:"5px"}}> Destination Info
            <div className='border' style={{ margin:"5px"}}>
               <br></br>
                <p style={{textAlign:"right", margin:"5px"}}>Destination Name: {destinations.name}</p>
                <p style={{textAlign:"right", margin:"5px"}}>Type: {destinations.destinationType}</p>
                <p style={{textAlign:"right", margin:"5px"}}>City: {destinations.city}</p>
                <p style={{textAlign:"right", margin:"5px"}}>State: {destinations.state}</p>
                <p style={{textAlign:"right", margin:"5px"}}>Address: {destinations.address}</p>
                <p style={{textAlign:"right", margin:"5px"}}>Description: {destinations.description}</p>
                <p style={{textAlign:"right", margin:"5px"}}>lat: {destinations.lat}</p>
                <p style={{textAlign:"right", margin:"5px"}}>lng: {destinations.lng}</p>
                {user.id===destinations.owner_id?
                <button onClick={handleDelete}>delete</button>:null
                }
                 {user.id===destinations.owner_id?
                <button style={{margin:"10px"}} onClick={handleEdit}>edit</button>:null
                }
            </div>
        </div>

    )


}
