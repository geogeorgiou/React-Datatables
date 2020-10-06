import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";


const loader = (props) => {

    return (props.loading && <CircularProgress/>); //return loader only if props.loading is true
    // return (<CircularProgress/>); //return loader only if props.loading is true

    //AADE LOOK ALIKE

    // return (
    //     <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="192"
    //         height="192"
    //         viewBox="0 0 24 24"
    //     >
    //         <path fill="none" d="M0 0h24v24H0z"></path>
    //         <path
    //             d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 016 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path>
    //     </svg>);
}

export default loader;