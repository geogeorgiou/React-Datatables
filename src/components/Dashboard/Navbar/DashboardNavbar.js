import React, {Component} from 'react';
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
    Button,
    Badge
} from 'reactstrap';

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

import {messages} from "../../../messages/messages";
import NewRequestModal from "../../Modal/NewRequestModal";

class DashboardNavbar extends Component{

    state = {
        isNavbarOpen: false,
        newRequestModalShow : false
    }

    toggleNavbarMenu = () => {
        this.setState(prevState => {
            return {
                isNavbarOpen: !prevState.isNavbarOpen
            }
        });
    }

    newRequestModalToggler = () => {
        this.setState(prevState => {
            return {newRequestModalShow: !prevState.newRequestModalShow}
        });
    }


    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={() => this.toggleNavbarMenu()}/>
                    <Collapse isOpen={this.state.isNavbarOpen} navbar>
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
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {/*<NavItem>*/}
                            {/*    <Button>Why hello</Button>*/}
                            {/*</NavItem>*/}

                        </Nav>

                        {/*<InputGroup>*/}
                        {/*    <InputGroupAddon addonType="prepend">*/}
                        {/*        <InputGroupText >{messages.dashboardVat}</InputGroupText>*/}
                        {/*    </InputGroupAddon>*/}
                        {/*    <Input placeholder="username" disabled/>*/}
                        {/*</InputGroup>*/}

                        <Button color="primary" size="lg" onClick={() => this.newRequestModalToggler()}>
                            <AddIcon className="mb-1"/> {messages.dashboardNewRequest}
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

                <NewRequestModal show={this.state.newRequestModalShow} onHide={this.newRequestModalToggler} modalBackdrop={true} modalKeyboard={false}/>
            </div>
        );
    }

}

export default DashboardNavbar;