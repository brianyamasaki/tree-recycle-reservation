import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import './Map.css';

export type LatLng = {
  description?:string;
  address?:string;
  lat:number;
  lng:number;
}
export type MapProps = {
  location: LatLng;
  zoomLevel: number;
  trees: LatLng[]
}
const Map: React.FunctionComponent<MapProps>  = ({location, zoomLevel, trees}) => {
  const treePins = trees.map(tree => (
    <LocationPin lat={tree.lat} lng={tree.lng} address={tree.address || ''} description={tree.description || ''} />
  ));
  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY as string}}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        >
          <LocationPin 
            lat={location.lat}
            lng={location.lng}
            address={location.address || ''}
            description={location.description || ''}
          />
          {treePins}
        </GoogleMapReact>
    </div>
  )
}

export default Map;