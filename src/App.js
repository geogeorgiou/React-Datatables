import React, { useEffect, useState, useMemo } from 'react';
import Aux from './hoc/Auxiliary/Auxiliary'
import DashboardNavbar from "./components/Dashboard/Navbar/DashboardNavbar";
import DashboardFilterNavbar from  './components/Dashboard/Navbar/DashboardFilterNavbar'
import {
    Container,
    // Card,
    // CardImg,
    // CardText,
    // CardBody,
    // CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {messages} from "./messages/messages";
// import { SelectColumnFilter } from './filters';

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

    // const renderRowSubComponent = (row) => {
    //     const {
    //         name: { first, last },
    //         location: { city, street, postcode },
    //         picture,
    //         cell,
    //     } = row.original;
    //     return (
    //         <Card style={{ width: '18rem', margin: '0 auto' }}>
    //             <CardImg top src={picture.large} alt='Card image cap' />
    //             <CardBody>
    //                 <CardTitle>
    //                     <strong>{`${first} ${last}`} </strong>
    //                 </CardTitle>
    //                 <CardText>
    //                     <strong>Phone</strong>: {cell} <br />
    //                     <strong>Address:</strong>{' '}
    //                     {`${street.name} ${street.number} - ${postcode} - ${city}`}
    //                 </CardText>
    //             </CardBody>
    //         </Card>
    //     );
    // };

    const columns = useMemo(
        () => [
          //   {
          //       Header: () => null,
          //       id: 'expander', // 'id' is required
          //       Cell: ({ row }) => (
          //           <span {...row.getToggleRowExpandedProps()}>
          //   {row.isExpanded ? '👇' : '👉'}
          // </span>
          //       ),
          //   },
            {
                Header: messages.title,
                accessor: 'name.title',
                disableSortBy: true,
                // Filter: SelectColumnFilter,
                // filter: 'equals',
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
            // {
            //     Header: 'Hemisphere',
            //     accessor: (values) => {
            //         const { latitude, longitude } = values.location.coordinates;
            //         const first = Number(latitude) > 0 ? 'N' : 'S';
            //         const second = Number(longitude) > 0 ? 'E' : 'W';
            //         return first + '/' + second;
            //     },
            //     disableSortBy: true,
            //     Filter: SelectColumnFilter,
            //     filter: 'equals',
            //     Cell: ({ cell }) => {
            //         const { value } = cell;
            //
            //         const pickEmoji = (value) => {
            //             let first = value[0]; // N or S
            //             let second = value[2]; // E or W
            //             const options = ['⇖', '⇗', '⇙', '⇘'];
            //             let num = first === 'N' ? 0 : 2;
            //             num = second === 'E' ? num + 1 : num;
            //             return options[num];
            //         };
            //
            //         return (
            //             <div style={{ textAlign: 'center', fontSize: 18 }}>
            //                 {pickEmoji(value)}
            //             </div>
            //         );
            //     },
            // },
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