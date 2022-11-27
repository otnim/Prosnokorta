import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import React from "react";

function NavBar({ user }) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/">
                    Prosnokorta
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                        {user && <Link className="nav-link" to={user && `/${user.userType}`}>
                            {user ? `${user.userType}` : 'Dashboard'}
                        </Link>}

                    </Nav>
                    <Nav>
                        {!user && (
                            <React.Fragment>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </React.Fragment>
                        )}
                        {user && (
                            <React.Fragment>
                                <Link className="nav-link" to="/">
                                    {user.name}
                                </Link>
                                <Link className="nav-link" to="/logout">
                                    Logout
                                </Link>
                            </React.Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;