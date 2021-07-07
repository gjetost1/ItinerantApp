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

    const handleEdit = () => {

        history.push(`/destinations/${destinations.id}/edit`)
    }

    return (

        <div className="font-medium rounded-full shadow-sm"  style={{textAlign:"left", marginLeft:"26%", fontSize:"5vh", color:"black"}}> Destination Info
            <div className='border' style={{ margin:"5px"}}>
               <br></br>
                {/* <p style={{textAlign:"left", margin:"5px"}}>Type: {destinations.destinationType}</p> */}
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.name}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.city}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.state}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.address}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.description}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.lat}</p>
                <p style={{textAlign:"left", margin:"5px"}}>{destinations.lng}</p>
                {user.id===destinations.owner_id?
                <button  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleDelete}>delete</button>:null
                }
                 {user.id===destinations.owner_id?
                <button  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{margin:"10px"}} onClick={handleEdit}>edit</button>:null
                }
            </div>
        </div>

    )


}
