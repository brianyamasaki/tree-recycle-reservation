import React from 'react';
import { AuthContext }  from '../contexts/AuthProvider';
import Map from '../components/Map';
import {LatLng} from '../components/Map';

const defaultMapCenter: LatLng = {
  lat: 47.7045034,
  lng: -122.1977788,
  description: "McAuliffe Park",
  address: "10824 NE 116th St, Kirkland, WA 98034"
}

const demoTrees: LatLng[] = [
  {
    description: 'Hellen Keller Elementary School',
    address: '13820 108th Ave NE, Kirkland, WA 98034',
    lat: 47.7252627,
    lng:-122.1955794,
  },
  {
    description: "Peter Kirk Elementary School",
    address: '1312 6th St, Kirkland, WA 98033',
    lat: 47.6860654,
    lng: -122.1956143
  },
  {
    description: 'Holy Spirit Lutheran Church',
    address: '10021 NE 124th St, Kirkland, WA 98034',
    lat: 47.7107032,
    lng: -122.2067723
  }
]

const Admin = () => {
  const appUser = React.useContext(AuthContext);

  if (appUser.isLoggedIn) {
    return (
      <div className="col-md-12">
        <h1 className="text-center">Admin Portal</h1>
        <Map location={defaultMapCenter} zoomLevel={13} trees={demoTrees}/>
      </div>
    )
  }
  return (
    <h1 className="text-center">Admin Portal</h1>
  )
};

export default Admin;