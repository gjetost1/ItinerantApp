
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editDestination} from "../../store/destinations"



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
       let createdDestination =
      dispatch(editDestination(data))

        history.push(`/destinations`)
    }
    return (
        <div style={{flexDirection: "column", textAlign:"center", marginLeft:"25%"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"orange", alignItems:"right", display: "flex", flexDirection:"column"}}>
                <p>New Destination Form</p>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}/>

                <label htmlFor="owner">Owner:</label>
                <input type="text" id="owner" onChange={(e) => setOwnerId(e.target.value)} value={owner_id}/>

                <label htmlFor="destinationType">Destination Type:</label>
                <input type="text" id="destinationType" onChange={(e) => setDestinationType(e.target.value)} value={destinationType}/>

                <label htmlFor="city">City:</label>
                <input type="text" id="city" onChange={(e) => setCity(e.target.value)} value={city}/>

                <label htmlFor="state">State:</label>
                <input type="text" id="state" onChange={(e) => setState(e.target.value)} value={state}/>

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address}/>

                <label htmlFor="lat">Latitude:</label>
                <input type="text" id="lat" onChange={(e) => setLat(e.target.value)} value={lat}/>

                <label htmlFor="lng">Longitude:</label>
                <input type="text" id="lng" onChange={(e) => setLng(e.target.value)} value={lng}/>

                <label htmlFor="description">Description:</label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} />

                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
