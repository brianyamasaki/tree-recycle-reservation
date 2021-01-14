import React, { FunctionComponent } from 'react';
import { Tree } from 'react-bootstrap-icons';
import { LatLng } from './Map';

const LocationPin:FunctionComponent<LatLng> = () => (
  <Tree color="red" size={24} />
)

export default LocationPin;