import React, { useEffect }  from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";

import mapStyles from "./mapStyles"
import { useDispatch } from 'react-redux';
import { getAllDestinations } from "../store/destinations";
import CreateDestination from "./destinations/CreateDestination";


const libraries = ["places"]
const mapContainerStyle = {
    width: "75vw",
    height: "100vh",
    marginLeft:"25vw"
};

const center = {
    lat: 44.9398,
    lng: -93.2979
}

const options = {
    styles: mapStyles
}

function hider() {
    let btn = document.getElementById("but")
    if (btn.style.display === "none") {
      btn.style.display = "block";
    } else {
      btn.style.display = "none"
    }
  }

function MapCreate() {
 //dynamic gen
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDestinations())
    }, [dispatch])

    // const destinations = useSelector(state => state.destinations.destinations)

    // const handleClick = (destination) => {
    //     setSelected({
    //         "id": destination.id,
    //         "lat": destination.lat,
    //         "lng": destination.lng,
    //         "name": destination.name,
    //         "destinationType": destination.destinationType,
    //         "city": destination.city,
    //         "state": destination.state,
    //         "address": destination.street,
    //         "description": destination.description,
    //     })
    // };

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

    // debug mode

    if (loadError) return "error loading maps"
    if (!isLoaded) return "loading maps"

    return (<div>
      <div id="but" className="text-white text-xs" style={{left:"50%", margin:"1vh", position:"absolute", zIndex:"999"}}>Click anywhere on the map to make a marker!
            <button onClick={hider}  style={{height:'2vh', width:"1vw", margin:"2px"}} className="inline-flex items-center px-2  border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white hover:bg-gray-900 hover:text-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">x</button>
          </div>
        <GoogleMap
            mapContainerStyle= {mapContainerStyle}
            zoom={12}
            center= {center}
            options = {options}
            onClick={onMapClick}
            onLoad={onMapLoad}
        >

                {/* dynamic gen */}

                {/* {destinations?.map(destination => (

                <Marker
                    key={destination.id}
                    position={{ lat: parseFloat(destination.lat), lng: parseFloat(destination.lng)}}
                    anchor={null}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/micons/orange-dot.png',
                        scaledSize: new window.google.maps.Size(40,40),
                        labelOrigin: new window.google.maps.Point(30,30),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(30,10)
                    }}
                    animation={window.google.maps.Animation.DROP}
                    clickable={true}
                    onClick={() => handleClick(destination) }>

                {selected && selected.id===destination.id ? (<InfoWindow position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} onCloseClick={()=>{
                    setSelected(null);
                }}>
                    <div id="destination_container" className= "destination_container" style={{ textAlign:"center"}}>

                        <ul style={{ textAlign:"center"}}>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.name}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>Type: {destination.destinationType}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.city}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.state}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.address}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>{destination.description}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>Lat: {destination.lat}</li>
                        <li style={{textAlign:"center", margin:"5px"}}>Lat: {destination.lng}</li>


                        </ul>
                        <NavLink to={`/destinations/${destination.id}`}>
                             <button>Modify</button>
                        </NavLink>


                    </div>
                </InfoWindow>) : null}</Marker>


            ))} */}

            {/* click gen */}
            {markers.map(marker => (
                <Marker
                    key={marker.time.toISOString()}
                    position={{lat: marker.lat, lng: marker.lng}}
                    anchor={null}
                    icon ={{
                        url: 'https://maps.google.com/mapfiles/ms/micons/orange-dot.png',
                        scaledSize: new window.google.maps.Size(40,40),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(10,10)
                    }}
                    onClick = {()=> {
                        setSelected(marker)
                    }}
                />
            ))}
            {selected ? (
                <InfoWindow
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={()=>{
                    setSelected(null);
                }}>
                <div style={{height:"70vh", width:"25vw", backgroundColor:"#333333"}}>
                   <CreateDestination latX={selected.lat} lngY={selected.lng} />
                </div>
            </InfoWindow>) : null}
        </GoogleMap>



        </div>)

}

export default MapCreate;
