import React, { useState, useRef} from 'react';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader, LoadScript} from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';

import './css/locationForm.css'


const LocationForm:React.FC = (): JSX.Element => {


  const defaultCenter: google.maps.LatLngLiteral = {
    lat: 40.774799,
    lng: -73.951727
  }

    const [lat, setLat] = useState<number>(40.774799);
    const [lng, setLng] = useState<number>(-73.951727);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    //Marker position state
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(defaultCenter);


    //func to handle marker drag
    const onMarkerDrag = (e:any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setLat(lat);
      setLng(lng);
      setMarkerPosition({lat, lng});
    }

    const containerStyle = {
      width: '500px',
      height: '500px',
      borderRadius: '10px',
      marginTop: '30px',
      // marginLeft: '100px'
    };




    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY!
    })

    const onLoad = React.useCallback((map:any) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback((map:any) => {
    setMap(null)
  }, [])

  const onPlaceSelected= (place:any) => {
    if(place.geometry){
      const lat = place.geomgetry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({lat, lng});
    }
    console.log(place)
  }

   const onSearch = () => {
     if(map && inputRef.current){

      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
      };


        // const service = new window.google.maps.places.AutocompleteService();
        // console.log(service)
      }
    //     if (map && inputRef.current) {
    //       const service = new window.google.maps.places.AutocompleteService();
    //       service.getPlacePredictions(
    //         {
    //           input: inputRef.current.value,
    //           types: ['geocode']
    //         },
    //     (predictions) => {
    //       if (predictions && predictions.length > 0) {
    //         const { place_id } = predictions[0];
    //         const placesService = new window.google.maps.places.PlacesService(map);
    //         placesService.getDetails(
    //           {
    //             placeId: place_id,
    //             fields: ['geometry']
    //           },
    //           (place, status) => {
    //             if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry) {

    //               const lat = place.geometry.location!.lat();
    //               const lng = place.geometry.location!.lng()

    //               setMarkerPosition({ lat, lng });
    //               map.panTo({ lat, lng });
    //             }
    //           }
    //         );
    //       }
    //     }
    //   );
    // }
  };



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
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
              <input
                type="text"
                placeholder="Search for an address"
                ref={inputRef} />
              <button onClick={onSearch}>Search</button>
            </div>
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
