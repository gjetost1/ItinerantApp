import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllDestinations} from '../../store/destinations';

export default function Destinations() {

    const destinations=useSelector((state)=>state.destinations.destinations)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllDestinations())
    },[dispatch])

    if (!destinations) {
        return null
    } else {
        return (
           <div style={{textAlign:"left", marginLeft:'26%' }}>All Destinations
            <p>____</p>
            {destinations.map(destination => <li><button onClick={e => {window.location=`/destinations/${destination.id}`}}> {destination.name} </button></li>)}
           </div>

        )
    }

}
