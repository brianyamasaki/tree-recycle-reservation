import React, { useEffect, useState, FunctionComponent } from "react";
import firebase from "firebase/app";

type appUser = {
  isLoggedIn:boolean;
  user: firebase.User | null ;
}
const noUser: appUser = {
  isLoggedIn: false,
  user: null
}
export const AuthContext = React.createContext(noUser);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(noUser);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          isLoggedIn: true,
          user
        });
      } else {
        setUser({
          isLoggedIn: false,
          user: null
        })
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
};