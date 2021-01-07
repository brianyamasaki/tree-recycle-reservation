import React from 'react';
import firebase from 'firebase/app';

const UserContext = React.createContext({});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export type AppUser = {
  loggedIn: boolean;
  user?: firebase.User;
}
export const onAuthStateChange = (callback:React.Dispatch<React.SetStateAction<AppUser>>) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({
        loggedIn: true,
        user
      });
    } else {
      callback({
        loggedIn: false
      });
    }
  })
}
