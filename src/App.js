import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Aux from './hoc/Auxiliary/Auxiliary'
import DashboardNavbar from "./components/Dashboard/Navbar/DashboardNavbar";
import DashboardFilterNavbar from  './components/Dashboard/Navbar/DashboardFilterNavbar'
import { Container } from 'reactstrap';
import TableContainer from './TableContainer';
import axios from 'axios';

import clsx from "clsx";
import {messages} from "./messages/messages";
import makeData from "./makeData";

// Let's simulate a large dataset on the server (outside of our component)
const serverData = makeData(10000)

const App = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageCount, setPageCount] = useState(10); //TODO NEED TO SET THIS

    // const fetchIdRef = React.useRef(0);

    // const doFetch = async () => {
    //     // const response = await axios.get('https://randomuser.me/api/?results=100');
    //     const response = await axios.get('https://randomuser.me/api/?results=5');
    //     const body = await response.data;
    //     const contacts = body.results;
    //     // console.log(contacts);
    //     // setData(contacts);
    // }

    const fetchData = useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        // const fetchId = ++fetchIdRef.current

        // Set the loading state
        setLoading(true);

        // We'll even set a delay to simulate a server here
        // setTimeout(() => {
        //     // Only update the data if this is the latest fetch
        //     if (fetchId === fetchIdRef.current) {
        //         const startRow = pageSize * pageIndex
        //         const endRow = startRow + pageSize
        //         setData(serverData.slice(startRow, endRow))
        //
        //         // Your server could send back total page count.
        //         // For now we'll just fake it, too
        //         setPageCount(Math.ceil(serverData.length / pageSize))
        //
        //         setLoading(false)
        //     }
        // }, 1000)

        axios.get('https://randomuser.me/api/?results=5')
            .then(response => {

                //get the data from response
                const body = response.data;

                //access the JSON data from body
                const contacts = body.results;

                //set pageCount, pageSize ???

                setData(contacts);
                setLoading(false);
                setError(false);

            })
            .catch(() => {
                setData([]);
                setLoading(false);
                setError(false);
            });

    }, [])

    const columns = useMemo(
        () => [
            {
                Header: messages.title,
                accessor: 'name.title',
                disableSortBy: true,
                // Filter: SelectColumnFilter,
                // filter: 'equals',
                // Cell: ({ cell }) => {
                //     const { value } = cell;
                //
                //     const getTitleStyles = (value) => {
                //
                //         let titleStyles;
                //         if (value === 'Mr'){
                //             titleStyles = 'alert-primary';
                //         }
                //         else{
                //             titleStyles = 'alert-danger';
                //         }
                //         return titleStyles;
                //     }
                //
                //     return (
                //         <div className={clsx('alert', getTitleStyles(value))} style={{ textAlign: 'center'}}>
                //             { value }
                //         </div>
                //     );
                // }
            },
            {
                Header: messages.firstName,
                accessor: 'name.first',
            },
            {
                Header: messages.lastName,
                accessor: 'name.last',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: messages.city,
                accessor: 'location.city',
            }
        ],
        []
    );

    return (
        <Aux>
            <DashboardNavbar/>
            <DashboardFilterNavbar/>
            <Container style={{ marginTop: '1rem' }}>
                <TableContainer
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    pageCount={pageCount}
                    isLoading={loading}
                    isError={error}
                    noDataText={messages.dashboard.noDataText}
                    noFilteredDataText={messages.dashboard.noFilteredDataText}
                    // renderRowSubComponent={renderRowSubComponent}
                />
            </Container>
        </Aux>

    );
};

export default App;