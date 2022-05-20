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
  const currentUser = "tony";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
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

  const handleAddClick = (e) => {
    e.preventDefault()
    // console.log(e.lngLat)
    const { lat, lng } = e.lngLat
    setNewPlace({
      lat: lat,
      lon: lng
    })
  }
  return (
    <Map
      {...viewSate}
      onMove={nextView => setViewSate(nextView.viewState)}

      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      {pins.map((p, index) => {
        return (
          <div key={index}>
            <Marker className={styles.marker} longitude={p.lon} latitude={p.lat}
              color="red" anchor='center'
              onClick={(e) => {
                setCurrentPlaceId(p._id)
                // console.log("clickedOpen:", p._id)
                // console.log("clickedCurrID:", currentPlaceId)
              }}
            >

            </Marker>
            {currentPlaceId === p._id && <Note
              lat={p.lat}
              lon={p.lon}
              title={p.title}
              description={p.description}
              username={p.username}
              createdAt={p.createdAt}
              setCurrId={setCurrentPlaceId}
            />}
          </div>
        )
      })}

      {newPlace && <Popup
        latitude={newPlace.lat}
        longitude={newPlace.lon}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setNewPlace(null)}
        anchor="left"
      />}
    </Map>
  );
}

export default App;
