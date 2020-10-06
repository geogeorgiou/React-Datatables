import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";



const loader = (props) => {

    // return (props.loading && <CircularProgress/>); //return loader only if props.loading is true
    return (<CircularProgress/>); //return loader only if props.loading is true
}

export default loader;