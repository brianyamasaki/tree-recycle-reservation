import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Menubar from './components/Menubar';
import LandingPage from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Admin from './pages/Admin';
import NotFound from './pages/404';
import './App.css';
import { onAuthStateChange, AppUser, UserProvider } from './contexts/firebaseUser';

const noUser: AppUser = {
  loggedIn: false
}
function App() {
  const [ appUser, setUser ] = React.useState(noUser);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    }
  },[]);

  return (
    <UserProvider value={appUser} >
      <div className="App container">
        <Menubar />
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
