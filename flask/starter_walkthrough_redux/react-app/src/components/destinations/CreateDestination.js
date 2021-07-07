
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createDestination} from "../../store/destinations"



export default function CreateDestination(latLng) {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state?.session.user)

    const [name, setName] = useState('')
    const [owner_id, setOwnerId] = useState(user.id)
    const [destinationType, setDestinationType] = useState('7')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [lat, setLat] = useState(latLng.latX)
    const [lng, setLng] = useState(latLng.lngY)
    const [description, setDescription] = useState('')
    // console.log(latX.latX)
    console.log(latLng.latX)
    if(!user) return null


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
      dispatch(createDestination(data))

        history.push(`/destinations`)
    }
    return (
        <div style={{flexDirection: "column", backgroundColor:"#333333", width:"50vw", height:"55vh"}}>
            <form onSubmit={(e) => handleSubmit(e)} style={{ backgroundColor:"333333", alignItems:"right", display: "flex", flexDirection:"column"}}>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => setName([e.target.value])} value={name}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="owner">Owner:</label>
                <input type="text" id="owner" onChange={(e) => setOwnerId(user.id)} value={owner_id}/>

                {/* <label htmlFor="destinationType">Destination Type:</label>
                <input type="text" id="destinationType" onChange={(e) => setDestinationType(e.target.value)} value={destinationType}/> */}

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="destinationType">Destination Type:</label>
                <select name="destinationType" id="destinationType" onChange={(e) => setDestinationType([e.target.value])} value={destinationType}>
                    <option value="1">Park</option>
                    <option value="2">Restaurant</option>
                    <option value="3">Bar</option>
                    <option value="4">Music</option>
                    <option value="5">Library</option>
                    <option value="6">Lodging</option>
                    <option value="7">Destination</option>
                </select>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="city">City:</label>
                <input type="text" id="city" onChange={(e) => setCity(e.target.value)} value={city}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="state">State:</label>
                <input type="text" id="state" onChange={(e) => setState(e.target.value)} value={state}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="address">Address:</label>
                <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="lat">Latitude:</label>
                <input type="text" id="lat" onChange={(e) => setLat(latLng.latX)} value={lat}/>

                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="lng">Longitude:</label>
                <input type="text" id="lng" onChange={(e) => setLng(latLng.lngY)} value={lng}/>


                <label className="text-white" style={{fontSize:"3vh"}} htmlFor="description">Description:</label>
                <textarea id="description" onChange={(e) => setDescription(e.target.value)} value={description} />

                <button type="submit">Submit</button>

            </form>
        </div>
    )


}
