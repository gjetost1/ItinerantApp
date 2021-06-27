import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllDestinations} from '../../store/destinations';

export default function Destinations() {

    const destinations=useSelector((state)=>state.destinations.destinations)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllDestinations())
    },[dispatch])
    console.log(destinations)
    if (!destinations) {
        return null
    } else {
        return (
           <div style={{textAlign:"right" }}>All Destinations
            <p>____</p>
            {destinations.map(destination => <li>{destination.name}</li> )}
           </div>

        )
    }

}
