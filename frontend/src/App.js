import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from "axios"
import locationIcon from "./assets/location.svg"
// import * as turf from "@turf/turf"
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@material-ui/icons/LocationOn"

import styles from "./App.module.css"
import Note from './components/Note';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const coordinates = {
  longitude: 11.335160,
  latitude: 51.015280
}

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewSate, setViewSate] = useState({
    width: "100vw",
    height: "100vh",
    longitude: coordinates.longitude,
    latitude: coordinates.latitude,
    zoom: 8
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pins")
        console.log('res::', response)
        setPins(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPins()
  }, []);

  const handleMarkerClick = (id) => {

    setCurrentPlaceId(id)
  }

  return (
    <Map
      {...viewSate}
      onMove={nextView => setViewSate(nextView.viewState)}

      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {pins.map((p, index) => {
        return (
          <div key={index}>
            <Marker className={styles.marker} longitude={p.lon} latitude={p.lat}
              color="red" anchor='center'

            >
              <img src={locationIcon} width="80px"
              className={styles.marker}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentPlaceId(p._id)
                  console.log("clickedOpen:", p._id)
                  console.log("clickedCurrID:", currentPlaceId)
                }}
              />
            </Marker>
            {currentPlaceId === p._id && <Note
              lat={p.lat}
              lon={p.lon}
              title={p.title}
              description={p.description}
              username={p.username}
              createdAt={p.createdAt}
            />}
          </div>
        )
      })}
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