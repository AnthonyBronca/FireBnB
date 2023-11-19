import React, { useState, useEffect, ReactElement } from 'react';
import ListNavBar from '../../components/Navigation/ListNavBar';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import {GoogleMap, Marker, InfoWindow, useJsApiLoader, Autocomplete} from '@react-google-maps/api';


const LocationForm:React.FC = (): JSX.Element => {

    const [lat, setLat] = useState<number>(40.754799)
    const [lng, setLng] = useState<number>(-73.951727)
    const [map, setMap] = React.useState(null)

    const containerStyle = {
      width: '400px',
      height: '400px'
    };

    const center = {
        lat,
        lng
    };


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY!
    })

    const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>

            <ListNavBar />
         <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
  ): <></>;
}

export default React.memo(LocationForm);
