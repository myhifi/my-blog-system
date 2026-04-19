import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const AppNavbar = ({toggleDark, dark}) => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Container>
                <Navbar.Brand>Article App</Navbar.Brand>
                <button className="btn btn-outline-light" onClick={toggleDark}>
                    {dark ? '☀️' : '🌙'}
                </button>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;