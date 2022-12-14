import React, { useState } from "react";
import "../assets/css/Home.css";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Authentication from "./Authentication";

const Home = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Container fluid className="p-0"> 
                {openModal && <Authentication openModal={openModal} setOpenModal={setOpenModal} />}
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#home">
                            Online Code Editor
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/editor" className="me-3">
                                    Editor
                                </Nav.Link>
                                <Button variant="outline-light" onClick={() => setOpenModal(true)}>
                                    <strong>Login / SignUp</strong>
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </>
    );
};

export default Home;
