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

        <div className="font-medium rounded-full shadow-sm text-white" style={{fontSize:"3vh",textAlign:"left", marginLeft:"26%", fontSize:"5vh"}}> Destination Info
            <div className='border' >
                {/* <p style={{textAlign:"left", margin:"5px"}}>Type: {destinations.destinationType}</p> */}
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.name}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.city}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.state}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.address}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.description}</p>
                {/* <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.lat}</p>
                <p className="text-white" style={{fontSize:"3vh", textAlign:"left", margin:"5px"}}>{destinations.lng}</p> */}
                {user.id===destinations.owner_id?
                <button  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"  onClick={handleDelete}>Delete</button>:null
                }
                 {user.id===destinations.owner_id?
                <button  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"  style={{margin:"10px"}} onClick={handleEdit}>Edit</button>:null
                }
            </div>
        </div>

    )


}
