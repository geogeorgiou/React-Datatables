import React from 'react';

import {Button} from 'reactstrap';

const customButton = (props) => {

    let customButton = null;


    switch (props.btntype){
        case('confirm'):
            customButton = <Button className="btn btn-outline-primary" {...props}/>;
            break;
        case('reject'):
            customButton = <Button className="btn btn-outline-danger" {...props}/>;
            break;
        case('cancel'):
            customButton = <Button className="btn btn-secondary" {...props}/>;
            break;
        case('dashboard-light'):
            customButton = <Button className="btn btn-info" {...props}/>;
            break;

        //default case primary button {not with className secondary overrides somehow primary}
        default:
            customButton = <Button color="primary" {...props}/>;
    }

    return (customButton);

}

export default customButton;