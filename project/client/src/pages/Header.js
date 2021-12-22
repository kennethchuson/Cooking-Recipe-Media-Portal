import React from 'react'
import { Nav, Navbar} from "react-bootstrap";

function Home() {
    return (
        <div>
            <h1 className="title_name">🍳Cooking Recipe Portal🍳</h1>
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                    </Navbar.Brand>
                        <Navbar.Toggle className="hamburger_navbar" aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Users">Users</Nav.Link>
                        <Nav.Link href="/Statistics">Statistics</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </header>        
        </div>
    )
}

export default Home
