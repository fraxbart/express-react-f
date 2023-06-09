import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddPostForm from './forms/AddPostForm'

function NavScrollExample() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">EpicBlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/users">UserList</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Button variant="outline-success" onClick={handleShow}>
                            Add New Post!
                        </Button>
                        {/* MODALE OVE VERRANNO INSERITI I NUOVI POST */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Scrivi il tuo post!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddPostForm/></Modal.Body>
                            {/* <Modal.Footer>
                                <Button variant="outline-danger" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer> */}
                        </Modal>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavScrollExample