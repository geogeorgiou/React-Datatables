import React, { useEffect, useState, useMemo } from 'react';
import Aux from './hoc/Auxiliary/Auxiliary'
import DashboardNavbar from "./components/Dashboard/Navbar/DashboardNavbar";
import DashboardFilterNavbar from  './components/Dashboard/Navbar/DashboardFilterNavbar'
import {
    Container
} from 'reactstrap';
import TableContainer from './TableContainer';
import axios from 'axios';

import clsx from "clsx";
import {messages} from "./messages/messages";

const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const doFetch = async () => {
            const response = await axios.get('https://randomuser.me/api/?results=100');
            const body = await response.data;
            const contacts = body.results;
            // console.log(contacts);
            setData(contacts);
        };
        doFetch();
    }, []);


    const columns = useMemo(
        () => [
            {
                Header: messages.title,
                accessor: 'name.title',
                disableSortBy: true,
                // Filter: SelectColumnFilter,
                // filter: 'equals',
                Cell: ({ cell }) => {
                    const { value } = cell;

                    const getTitleStyles = (value) => {

                        let titleStyles;
                        if (value === 'Mr'){
                            titleStyles = 'alert-primary';
                        }
                        else{
                            titleStyles = 'alert-danger';
                        }
                        return titleStyles;
                    }

                    return (
                        <div className={clsx('alert', getTitleStyles(value))} style={{ textAlign: 'center'}}>
                            { value }
                        </div>
                    );
                }
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
            <Container style={{ marginTop: 100 }}>
                <TableContainer
                    columns={columns}
                    data={data}
                    // renderRowSubComponent={renderRowSubComponent}
                />
            </Container>
        </Aux>

    );
};

export default App;