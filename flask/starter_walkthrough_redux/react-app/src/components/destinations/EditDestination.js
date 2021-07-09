
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { editDestination, getDestinationById} from "../../store/destinations"



export default function EditDestination() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(()=>{
        dispatch(getDestinationById(id))
    }, [dispatch, id])


    const destinations = useSelector((state )=> state?.destinations)

    const user = useSelector(state => state.session.user)

    const [name, setName] = useState(destinations.name)
    const [owner_id, setOwnerId] = useState(1)
    const [destinationType, setDestinationType] = useState(1)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')


    const InitVals = () => {
        setName(destinations.name)
        setOwnerId(destinations.owner_id)
        setDestinationType(destinations.destinationType)
        setCity(destinations.city)
        setState(destinations.state)
        setAddress(destinations.address)
        setLat(destinations.lat)
        setLng(destinations.lng)
        setDescription(destinations.description)

    }
    useEffect(()=>{
      InitVals()

    }, [destinations])

    if(!user) return null


    const data = {
        id,
        name,
        owner_id,
        destinationType,
        city,
        state,
        address,
        lat,
        lng,
        description,
    };

    async function handleSubmit(e){
        e.preventDefault();
        dispatch(editDestination(data))
        history.push(`/destinations/`)
    }
    return (
        <div style={{flexDirection: "column", textAlign:"center", marginLeft:"25%"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"#f59e0b", alignItems:"right", display: "flex", flexDirection:"column"}}>
                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="name">Name:</label>
                <input className="rounded-full" type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="owner">Owner:</label>
                <input className="rounded-full" type="text" id="owner" onChange={(e) => setOwnerId(e.target.value)} value={owner_id} placeholder={destinations.owner_id}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="destinationType">Destination Type:</label>
                <select className="rounded-full" name="destinationType" id="destinationType" onChange={(e) => setDestinationType([e.target.value])} value={destinationType}>
                    <option value="1">Park</option>
                    <option value="2">Restaurant</option>
                    <option value="3">Bar</option>
                    <option value="4">Music</option>
                    <option value="5">Library</option>
                    <option value="6">Lodging</option>
                    <option value="7">Destination</option>
                </select>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="city">City:</label>
                <input className="rounded-full" type="text" id="city" onChange={(e) => setCity(e.target.value)} value={city} placeholder={destinations.city}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="state">State:</label>
                <input className="rounded-full" type="text" id="state" onChange={(e) => setState(e.target.value)} value={state} placeholder={destinations.state}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="address">Address:</label>
                <input className="rounded-full" type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address} placeholder={destinations.address}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="lat">Latitude:</label>
                <input className="rounded-full" type="text" id="lat" onChange={(e) => setLat(e.target.value)} value={lat} placeholder={destinations.lat}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="lng">Longitude:</label>
                <input className="rounded-full" type="text" id="lng" onChange={(e) => setLng(e.target.value)} value={lng} placeholder={destinations.lng}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="description">Description:</label>
                <textarea  id="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder={destinations.description} />

                <button  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"  style={{margin:"10px", textAlign:"center"}} type="submit">   Submit</button>

            </form>
        </div>
    )


}
