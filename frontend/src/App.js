import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import axios from "axios"
import locationIcon from "./assets/location.svg"
// import * as turf from "@turf/turf"
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@material-ui/icons/LocationOn"

import "./App.module.css"
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
    zoom: 10
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pins")
        // console.log('res::', response)
        setPins(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPins()
  }, []);

  const handleMarkerClick = (id, lat, lon) => {
    setViewSate({
      ...viewSate,
      longitude: lon,
      latitude: lat
    })
    setCurrentPlaceId(id)
  }

  const handleAddClick = (e) => {
    e.preventDefault()
    // console.log(e) 
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
      style={{ width: "100vw", height: "100vh", transitionDuration: "all 200ms" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
    >
      {pins.map((p, index) => {
        return (
          <div key={index}>
            <Marker className={'marker'} longitude={p.lon} latitude={p.lat} offset={[-2, -15]}
              color={currentUser === p.username ? "tomato" : "slateblue"} anchor='center' style={{ cursor: 'pointer' }}
              onClick={(e) => {
                handleMarkerClick(p._id, p.lat, p.lon)
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
      >
        <div>
          <form>
            <label>Tiele</label>
            <input placeholder='Enter a title'></input>
            <label>Review</label>
            <textarea placeholder='write your opinion about this place'></textarea>
            <label>Rating</label>
            <select>
              <option value={"1"} > 1 </option>
              <option value={"2"} > 2 </option>
              <option value={"3"} > 3 </option>
              <option value={"4"} > 4 </option>
              <option value={"5"} > 5 </option>
            </select>
            <button type='submit' className='submitButton' >Add Pin</button>
          </form>
        </div>
      </Popup>}
    </Map>
  );
}

export default App;
