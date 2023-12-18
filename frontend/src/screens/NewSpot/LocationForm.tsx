import React, { useState, useRef, useEffect} from 'react';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader, LoadScript, Autocomplete} from '@react-google-maps/api';
import './css/locationForm.css'
import { useFormContext } from '../../context/NewSpotContext';


const LocationForm:React.FC = (): JSX.Element => {
  const {formData} = useFormContext();
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY!

  const [lat, setLat] = useState<number>(40.7128);
  const [lng, setLng] = useState<number>(-74.006);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<any>(null);
  //Marker position state
  const defaultCenter: google.maps.LatLngLiteral = {
    lat,
    lng
  };

  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(defaultCenter);



    const onMarkerDrag = (e:any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setLat(lat);
      setLng(lng);
      setMarkerPosition({lat, lng});
      formData.lat = markerPosition?.lat;
      formData.lng = markerPosition?.lng;
    }

    const containerStyle = {
      width: '500px',
      height: '500px',
      borderRadius: '10px',
      marginTop: '30px',
    };

    const {isLoaded} = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiKey!
    })

    const onUnmount = React.useCallback((map:any) => {
      setMap(null)
    }, [])



  return isLoaded ? (
    <div className='location-container'>
      <div className='location-header-container'>
        <h1 className='location-header'>Where's your place located?</h1>
        <span className='location-info-span'>A real address is not needed because this is a fake site. You can skip this if you want.</span>
      </div>
      <div className='google-map-container'>
           <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={9}
          onLoad={(map) => setMap(map)}
          onUnmount={onUnmount}
          >
            {markerPosition && <Marker
              onDragEnd={(e)=> onMarkerDrag(e)}
              position={markerPosition}
              draggable={true}
              />
              }
        </GoogleMap>
      </div>
  </div>
  ): <></>;
}

export default React.memo(LocationForm);
