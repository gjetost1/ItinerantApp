import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllDestinations} from '../../store/destinations';

export default function Destinations() {

    const dispatch=useDispatch()
    const destination=useSelector(state=>Object.values(state.destinations))
    useEffect(()=>{
        dispatch(getAllDestinations())
    },[dispatch])

    return (
       <h2 style={{textAlign:"right"}}>STUFF WILL GO HERE VENTUALLY
       <h2 style={{textAlign:"right"}}>ALL KINDS OF STUFF YOU'LL SEE</h2>
       </h2>

    )
}
