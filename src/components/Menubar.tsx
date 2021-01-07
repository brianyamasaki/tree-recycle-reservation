import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase/app';

const Menubar = () => {
  const user = firebase.auth().currentUser;
  const [collapsed, setCollapsed] = useState(true);
  const authLinkText = !!user ? "Sign Out" : "Sign In";

  function onClickAuth(event:React.MouseEvent<HTMLAnchorElement>) {
    if (!!user) {
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>   
  )
}

export default Menubar;
