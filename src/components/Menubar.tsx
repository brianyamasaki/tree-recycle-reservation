import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase/app';
import { AuthContext } from '../contexts/AuthProvider';

const Menubar = () => {
  const appUser = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);
  const authLinkText = appUser.isLoggedIn ? "Sign Out" : "Sign In";

  function onClickAuth(event:React.MouseEvent<HTMLAnchorElement>) {
    if (appUser.isLoggedIn) {
      firebase.auth().signOut()
        .then(() => {
          console.log('successfully logged out');
        })
        .catch(error => {
          console.error('logout failure' + error.message)
        })
    }
  }

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light expand="xs">
        <NavbarBrand href="/" className="mr-auto">Home</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="mr-auto">
            <NavItem>
              <NavLink href="/signin/" onClick={onClickAuth}>{authLinkText}</NavLink>
            </NavItem>
            { appUser.isLoggedIn ? (
              <>
              <NavItem>
                <NavLink href="/reservations/">Tree Pickup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/">Tree Map</NavLink>
              </NavItem>
              </>
              ) : null
            }
            <NavItem>
              <NavLink href="/about/" >About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>   
  )
}

export default Menubar;
