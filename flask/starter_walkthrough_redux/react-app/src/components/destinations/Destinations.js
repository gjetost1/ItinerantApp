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
           <div className="flex-col items-start" style={{textAlign:"left", marginLeft:'26%', backgroundColor:"#333333" }}>
            <p className="text-white" style={{fontSize:"7vh"}}>All Destinations</p>
            {destinations.map(destination => <div key={destination.id} style={{margin:'5px'}}><button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={e => {window.location=`/destinations/${destination.id}`}}> {destination.name} </button></div>)}
           </div>

        )
    }

}
