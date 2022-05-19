import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map
      initialViewState={{
        longitude: 12.360103,
        latitude: 51.340199,
        zoom: 10
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default App;
