
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createDestination} from "../../store/destinations"



export default function CreateDestination() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [owner_id, setOwnerId] = useState(0)
    const [destinationType, setDestinationType] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')

    const user_id = useSelector(state => state.session.user)
    if(!user_id) return null


    const data = {
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
       let createdDestination = await dispatch(createDestination(data))

        history.push(`/destinations/${createdDestination.destination.id}`)
    }
    return (
        <div style={{flexDirection: "column"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{marginLeft:"25%",color:"blue", backgroundColor:"orange", alignItems:"right", display: "flex", flexDirection:"column"}}>
                <p>New Destination Form</p>
                <label for="name">Name:</label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}/>

                <label for="owner">Owner:</label>
                <input type="text" id="owner" onChange={(e) => setOwnerId(e.target.value)} value={owner_id}/>

                <label for="destinationType">Destination Type:</label>
                <input type="text" id="destinationType" onChange={(e) => setDestinationType(e.target.value)} value={destinationType}/>

                <label for="city">City:</label>
                <input type="text" id="city" onChange={(e) => setCity(e.target.value)} value={city}/>

                <label for="state">State:</label>
                <input type="text" id="state" onChange={(e) => setState(e.target.value)} value={state}/>

                <label for="address">Address:</label>
                <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address}/>

                <label for="lat">Latitude:</label>
                <input type="text" id="lat" onChange={(e) => setLat(e.target.value)} value={lat}/>

                <label for="lng">Longitude:</label>
                <input type="text" id="lng" onChange={(e) => setLng(e.target.value)} value={lng}/>

                <label for="description">Description:</label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} />

                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
