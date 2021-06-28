import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getDestinationById, deleteDestination} from '../../store/destinations'





export default function DestinationById(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
    dispatch(getDestinationById(id))
    }, [dispatch, id])

    const destinations = useSelector(state => state.destinations.destinations)

    const user = useSelector(state => state.session.user)

    if (!destinations || !user) {
        return (
        <div>no destination?</div>
        )
    }

     const handleDelete = async () => {
        await dispatch(deleteDestination(destinations.id))
        history.push('/')
    }

    return (

        <div> Destination Info
            <div className='border'>
               <br></br>
                <p>Destination Name: {destinations.name}</p>
                <p>Type: {destinations.destinationType}</p>
                <p>City: {destinations.city}</p>
                <p>State: {destinations.state}</p>
                <p>Address: {destinations.address}</p>
                <p>Description: {destinations.description}</p>
                {user.id===destinations.owner_id?

                <button onClick={handleDelete}>delete</button>:null
                }
            </div>
        </div>

    )


}
