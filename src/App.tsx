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
import Reservations from './pages/Reservations';
import NotFound from './pages/404';
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App container">
        <Menubar />
        <div className="row text-left">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/about" component={About} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/reservations" component={Reservations} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
