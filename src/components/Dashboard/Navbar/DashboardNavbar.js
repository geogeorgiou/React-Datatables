import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Badge
} from 'reactstrap';

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import {messages} from "../../../Messages/messages";
// import Input from "@material-ui/core/Input";

const DashboardNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>



                    </Nav>

                    {/*<InputGroup>*/}
                    {/*    <InputGroupAddon addonType="prepend">*/}
                    {/*        <InputGroupText >{messages.dashboardVat}</InputGroupText>*/}
                    {/*    </InputGroupAddon>*/}
                    {/*    <Input placeholder="username" disabled/>*/}
                    {/*</InputGroup>*/}

                    <Button color="primary" size="lg">
                        <AddIcon className="mb-1" /> {messages.dashboardNewRequest}
                    </Button>

                    <NavbarText>Simple Text</NavbarText>

                    <Badge color="secondary">
                        <NotificationsIcon/>
                    </Badge>

                    <Badge color="secondary">
                        <PersonIcon/>
                    </Badge>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default DashboardNavbar;