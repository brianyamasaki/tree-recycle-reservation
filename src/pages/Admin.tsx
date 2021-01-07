import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';

const Admin = () => {
  const user = firebase.auth().currentUser;
  const history = useHistory();
  if (user) {
    return (
      <h1>Admin Portal for {user.email}</h1>
    )
  }
  history.push('/signin');

  return (
    <h3>Redirecting...</h3>
  )
};

export default Admin;