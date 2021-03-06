import React, { useEffect }  from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

import mapStyles from "./mapStyles"
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { getAllDestinations } from "../store/destinations";

const libraries = ["places"]
const mapContainerStyle = {
    width: "75vw",
    height: "100vh"
};

const center = {
    lat: 44.9398,
    lng: -93.2979
}

const options = {
    styles: mapStyles
}

function Map() {
 //dynamic gen
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDestinations())
    }, [dispatch])

    const destinations = useSelector(state => state.destinations.destinations)

    const handleClick = (destination) => {

        setSelected({
            "id": destination.id,
            "lat": destination.lat,
            "lng": destination.lng,
            "name": destination.name,
            "destinationType": destination.destinationType,
            "city": destination.city,
            "state": destination.state,
            "address": destination.street,
            "description": destination.description,

        })
    };

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

    return (<div style={{marginLeft:"25vw"}}>
        <GoogleMap

            mapContainerStyle= {mapContainerStyle}
            zoom={12}
            center= {center}
            options = {options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        >


                {/* dynamic gen */}

                {destinations?.map(destination => (

                <Marker
                    key={destination.id}
                    position={{ lat: parseFloat(destination.lat), lng: parseFloat(destination.lng)}}

                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/micons/orange-dot.png',
                        scaledSize: new window.google.maps.Size(40,40),
                        labelOrigin: new window.google.maps.Point(30,30),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(30,10)
                    }}
                    // animation={window.google.maps.Animation.DROP}
                    clickable={true}
                    onClick={() => handleClick(destination)}>

                {selected && selected.id===destination.id ? (<InfoWindow position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} onCloseClick={()=>{
                    setSelected(null);
                }}>
                    <div id="destination_container" className= "destination_container" style={{ textAlign:"center"}}>

                        <ul style={{ textAlign:"center"}}>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.name}</li>
                        {/* <li style={{textAlign:"center", margin:"5px"}}>Type: {destination.destinationType}</li> */}
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.city}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.state}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.address}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.description}</li>
                        {/* <li style={{textAlign:"center", margin:"5px"}}>Lat: {destination.lat}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>Lat: {destination.lng}</li> */}


                        </ul>
                        <NavLink to={`/destinations/${destination.id}`}>
                             <button>Modify</button>
                        </NavLink>


                    </div>
                </InfoWindow>) : null}</Marker>


            ))}

            {/* click gen */}
            {/* {markers.map(marker => (
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
                   <CreateDestination latX={selected.lat} lngY={selected.lng} />
                   {console.log(selected.lng)}


                </div>
            </InfoWindow>) : null} */}
        </GoogleMap>



        </div>)

}

export default Map;
