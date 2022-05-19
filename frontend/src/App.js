import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import locationIcon from "./assets/location.svg"
// import * as turf from "@turf/turf"
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@material-ui/icons/LocationOn"
import Star from "@material-ui/icons/Star"
import styles from "./App.module.css"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const coordinates = {
  longitude: 11.335160,
  latitude: 51.015280
}

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [viewSate, setViewSate] = useState({
    width: "100vw",
    height: "100vh",
    longitude: coordinates.longitude,
    latitude: coordinates.latitude,
    zoom: 8
  })

  return (
    <Map
      {...viewSate}
      onMove={nextView => setViewSate(nextView.viewState)}

      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >

      <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} color="red" anchor='center'>
        {/* <LocationOnIcon style={{fontSize:viewSate.zoom * 7}} /> */}
      </Marker>
      {showPopup && (
        <Popup longitude={coordinates.longitude} latitude={coordinates.latitude}
          anchor="top"
          onClose={() => setShowPopup(false)}>
          <div className={styles.card}>
            <label>Place</label>
            <h4 className={styles.place}> place name </h4>
            <label>Review</label>
            <p className={styles.description} > bla bla bla</p>
            <label>Rating</label>
            <div className={styles.stars} >
              <Star className={styles.star}/>
            </div>
            <label>Information</label>
            <span className={styles.username}>creadted by <b>tony</b></span>
            <span className={styles.date} >1 hour ago</span>
          </div>
        </Popup>)}
    </Map>
  );
}

export default App;
/*

      <FullscreenControl style={{ width: 'viewport', height: 'viewport' }} />
      <Marker longitude={12.36} latitude={51.34} anchor='center'>
        <img src={locationIcon} width="20px" />
      </Marker>
*/