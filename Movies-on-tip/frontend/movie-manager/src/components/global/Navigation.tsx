import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => {
    return (
        <>
            <Navbar bg="dark" variant='dark' expand="lg" className='border border-secondary'>
                <Container >

                    <Navbar.Collapse id="main-links">
                        <Nav>
                            <Nav.Link to="/movies-in-theaters" as={NavLink}>Movies in theaters</Nav.Link>
                            <Nav.Link to="/movies-coming" as={NavLink}>Coming Soon</Nav.Link>
                            <Nav.Link to="/top-rated-india" as={NavLink}>Top Rated Indian</Nav.Link>
                            <Nav.Link to="/top-rated-movies" as={NavLink}>Top Rated Movies</Nav.Link>
                            <Nav.Link to="/favourite" as={NavLink}>Favourite</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default Navigation;