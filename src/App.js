import React, { useEffect, useState, useMemo } from 'react';
import Aux from './hoc/Auxiliary/Auxiliary'
import DashboardNavbar from "./components/Dashboard/Navbar/DashboardNavbar";
import DashboardFilterNavbar from  './components/Dashboard/Navbar/DashboardFilterNavbar'
import {
    Container
} from 'reactstrap';
import TableContainer from './TableContainer';
import Loader from './components/UI/Loader/Loader'
import axios from 'axios';

import clsx from "clsx";
import {messages} from "./messages/messages";

const App = () => {
    const [data, setData] = useState([]);
    // const [loading,setLoading] = useState(true);
    useEffect(() => {
        const doFetch = async () => {
            // const response = await axios.get('https://randomuser.me/api/?results=100');
            const response = await axios.get('https://randomuser.me/api/?results=15');
            const body = await response.data;
            const contacts = body.results;
            // console.log(contacts);
            setData(contacts);
        };
        doFetch()
            // .then(() => setLoading(true))
            // .catch(err => {
            //     setLoading(false);
            // console.log(err)
        // });
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
            <Container style={{ marginTop: '1rem' }}>
                <TableContainer
                    columns={columns}
                    data={data}
                    // loading={loading}
                    // LoadingComponent={Loader}
                    // renderRowSubComponent={renderRowSubComponent}
                />
            </Container>
        </Aux>

    );
};

export default App;