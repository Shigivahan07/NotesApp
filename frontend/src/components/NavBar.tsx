import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";
import styles from "../styles/utils.module.css"

interface NavBarProps{
    loggedInUser: User | null,
    onSignUpClicked:()=> void,
    onLoginClicked:()=> void,
    onLogoutSuccessfull:()=> void,
    
}

const NavBar = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccessfull}: NavBarProps) => {
    
    return ( 
        <Navbar className={styles.colorOf} variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
                <Nav.Link as={Link} to="/">
                        Notes App 
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                                Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { 
                        loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessfull={onLogoutSuccessfull}/>
                        : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


     );
}
 
export default NavBar;