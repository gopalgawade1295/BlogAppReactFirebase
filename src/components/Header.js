import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

function Header({ isAuth, setIsAuth }) {
    let history = useHistory()

    const LogOut = () => {
        signOut(auth)
            .then((response) => {
                localStorage.clear()
                setIsAuth(false)
                history.push('/login')

            })
    }

    return <div>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to="/">&emsp;HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!isAuth ?
                        (<Nav.Link as={NavLink} to="/login">LOGIN</Nav.Link>)
                        :
                        (<Nav>
                            <Nav.Link as={NavLink} to="/createblog">CREATE BLOG</Nav.Link>
                            <Nav.Link as={NavLink} to="/login" onClick={LogOut}>LOGOUT</Nav.Link>
                        </Nav>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>;
}

export default Header;
