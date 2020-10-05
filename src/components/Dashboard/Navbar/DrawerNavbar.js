// import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import React from 'react';

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import MenuIcon from '@material-ui/icons/Menu'
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import clsx from "clsx";

import drawerNavbarStyles from './DrawerNavbar.module.css'


export default function DrawerNavbar() {
    // const classes = useStyles();
    // const classes = drawerNavbarStyles.toggler;
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            // className={clsx(classes.list, {
            //     [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            // })}
            className={clsx(drawerNavbarStyles.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={drawerNavbarStyles.toggler}>
            {/*{['left', 'right', 'top', 'bottom'].map((anchor) => (*/}
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
