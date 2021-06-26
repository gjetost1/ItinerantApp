import React, { useEffect }  from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

import mapStyles from "./mapStyles"

import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import {NavLink} from 'react-router-dom'


const libraries = ["places"]
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
};

const center = {
    lat: 44.9778,
    lng: -93.2650
}

const options = {
    styles: mapStyles
}


function Map() {

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyDZhB_aGyFMu_-gQbJsCU7Objjh3WtBcD4',
        libraries,
    });

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
        }])
    },[])

    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    },[])


    if (loadError) return "error loading maps"
    if (!isLoaded) return "loading maps"


    return (<div>
        <GoogleMap
            mapContainerStyle= {mapContainerStyle}
            zoom={8}
            center= {center}
            options = {options}
            onClick={onMapClick}
            onLoad={onMapLoad}

        >
                {/* dynamic gen */}

                {/* {venues?.map(venue => (

                <Marker
                    key={venue.id}
                    position={{ lat: parseInt(venue.lat), lng: parseInt(venue.lng)}}

                    icon={{
                        url: '/pick.svg',
                        scaledSize: new window.google.maps.Size(20,20),
                        labelOrigin: new window.google.maps.Point(30,30),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(30,10)
                    }}
                    // animation={window.google.maps.Animation.DROP}
                    clickable={true}
                    onClick={() => handleClick(venue)}



                >{selected && selected.id===venue.id ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{
                    setSelected(null);
                }}>
                    <div id="venue_container" className= "venue_container">
                        <h2>Venue Info</h2>
                        <ul>
                            <li>Name: {selected.name}</li>
                            <li> Capacity: {selected.capacity}</li>
                            <li>Venue Type: {selected.venueType}</li>
                            <li>Venue Pay: ${selected.pay}</li>
                            <li>City: {selected.city}</li>
                            <li>State: {selected.state}</li>
                            <li>Street: {selected.street}</li>
                            <li>Description: {selected.description}</li>
                            <li>Rating: {selected.rating}</li>


                        </ul>
                        <NavLink to={`/venues/edit/${venue.id}`}>
                             <button>Edit</button>
                        </NavLink>
                        <NavLink to={`/venues/${venue.id}`}>
                             <button>Delete</button>
                        </NavLink>

                    </div>
                </InfoWindow>) : null}</Marker>
            ))} */}

            {/* click gen */}
            {markers.map(marker => (
                <Marker
                    key={marker.time.toISOString()}
                    position={{lat: marker.lat, lng: marker.lng}}
                    icon ={{
                        url: './icon.svg',
                        scaledSize: new window.google.maps.Size(40,40),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(10,10)
                    }}
                    onClick = {()=> {
                        setSelected(marker)
                    }}
                />
            ))}
            {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{
                setSelected(null);
            }}>
                <div>
                    <h2>Destination</h2>
                    <p>Created {selected.name}</p>
                </div>
            </InfoWindow>) : null}
        </GoogleMap>


        </div>)

}

export default Map;
