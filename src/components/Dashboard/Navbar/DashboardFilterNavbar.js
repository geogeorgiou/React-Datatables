import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

class DashboardFilterNavbar extends Component {

    render() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <NavItem>
                            <NavLink href="#">Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Another Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink disabled href="#">Disabled Link</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }

}

export default DashboardFilterNavbar;