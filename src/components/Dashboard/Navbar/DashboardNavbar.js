import React, {Component} from 'react';
import {
    Badge,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap';

import DrawerNavbar from "./DrawerNavbar";
import NewRequestModal from "../../Modal/NewRequestModal";
import CustomButton from "../../UI/Buttons/CustomButton";

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';


import {messages} from "../../../messages/messages";


class DashboardNavbar extends Component{

    state = {
        isSidebarOpen: false,
        newRequestModalShow : false
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

                    <DrawerNavbar />

                    <NavbarBrand href="/">reactstrap</NavbarBrand>

                    <Collapse isOpen={this.state.isSidebarOpen} navbar>
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

                        {/*<Button color="primary" size="lg" onClick={() => this.newRequestModalToggler()}>*/}
                        {/*    <AddIcon className="mb-1"/> {messages.dashboardNewRequest}*/}
                        {/*</Button>*/}

                        <CustomButton size="lg" onClick={() => this.newRequestModalToggler()}>
                            <AddIcon className="mt-2"/> {messages.dashboard.newRequest}
                        </CustomButton>

                        {/*<CustomButton btntype="dash-primary" size="lg" onClick={() => this.newRequestModalToggler()}>*/}
                        {/*    <AddIcon className="mb-1"/> {messages.dashboardNewRequest}*/}
                        {/*</CustomButton>*/}

                        {/*<NavbarText>Simple Text</NavbarText>*/}

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