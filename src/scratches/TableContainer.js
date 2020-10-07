import React, {Fragment, useEffect} from 'react';
import {useExpanded, useFilters, usePagination, useTable,} from 'react-table';
import Loader from './components/UI/Loader/Loader'

import {messages} from "./messages/messages";

import {Button, Col, CustomInput, Row, Table} from 'reactstrap';
// import { Filter, DefaultColumnFilter } from './filters';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from "axios";

const TableContainer = ({columns, data, isLoading, isError, noDataText, noFilteredDataText, renderRowSubComponent}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            // defaultColumn: { Filter: DefaultColumnFilter },
            initialState: {pageIndex: 0, pageSize: 10},
        },
        useFilters,
        // useSortBy,
        useExpanded,
        usePagination
    );

    // useEffect(() => {
    //     console.log("ERROR " + isError);
    //     console.log("LOADING " + isLoading);
    // })

    // const generateSortingIndicator = (column) => {
    //     return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    // };

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));

        //Go To Page 0 after changing PageSize
        // gotoPage(0);

        onPageChange(0,pageSize);

        // onPageChange with 0 index?
    };

    // const onChangeInInput = (event) => {
    //     const page = event.target.value ? Number(event.target.value) - 1 : 0;
    //     gotoPage(page);
    // };

    // useEffect(() => {
    //     if (pageCount === 0){
    //         console.log(true)
    //     }
    //     console.log(pageCount)
    // })

    const onPageChange = (pageIndex, pageSize) => {
        // let pagesize = 5;
        let low = pageIndex * pageSize;
        let high = pageIndex * pageSize + pageSize;
        axios
            .get("https://randomuser.me/api/?results=15")
            .then((res) => {

                data = res.data;
                // Update react-table
                // this.setState({
                //     posts: res.data,
                //     data: res.data.slice(low, high),
                //     pages: res.data.pages,
                //     loading: false
                // });

                // setTimeout(function() { //Start the timer
                //     setLoading(false); //After 2 second, set render to true
                //     setError(false);
                // }, 2000)

                isLoading = false;
                isError = false;

            })
            .catch((err) => {
                // setLoading(false);
                // setError(true);
                isLoading = false;
                isError = true;
            });
    }

    return (
        <Fragment>

            {isLoading ?

                <Loader loading={isLoading}/> :

                isError ?

                    noDataText

                    :
                    <Table bordered responsive hover {...getTableProps()} >

                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {/*<div {...column.getSortByToggleProps()}>*/}
                                        {column.render('Header')}
                                        {/*{generateSortingIndicator(column)}*/}
                                        {/*</div>*/}
                                        {/*<Filter column={column} />*/}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>


                        <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <Fragment key={row.getRowProps().key}>
                                    <tr>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                    </tr>
                                    {/*{row.isExpanded && (*/}
                                    {/*    <tr>*/}
                                    {/*        <td colSpan={visibleColumns.length}>*/}
                                    {/*            {renderRowSubComponent(row)}*/}
                                    {/*        </td>*/}
                                    {/*    </tr>*/}
                                    {/*)}*/}
                                </Fragment>
                            );
                        })}
                        </tbody>
                    </Table>}

            <Row style={{maxWidth: 1000, margin: '0 auto', textAlign: 'center'}}>

                <Col md={4}>
                    <CustomInput
                        id='0'
                        type='select'
                        value={pageSize}
                        onChange={onChangeInSelect}
                    >
                        >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {messages.dashboard.totalRecords} {pageSize}
                            </option>
                        ))}
                    </CustomInput>
                </Col>


                <Col md={3} style={{marginTop: 7}}>
                    {messages.dashboard.pageText}{' '}
                    <strong>
                        {pageIndex + 1} {messages.dashboard.pageFrom} {pageOptions.length}
                    </strong>
                </Col>
                {/*<Col md={4}>*/}
                {/*    <Input*/}
                {/*        type='number'*/}
                {/*        min={1}*/}
                {/*        style={{ width: 70 }}*/}
                {/*        max={pageOptions.length}*/}
                {/*        defaultValue={pageIndex + 1}*/}
                {/*        onChange={onChangeInInput}*/}
                {/*    />*/}
                {/*</Col>*/}

                <Col md={5}>
                    {/*<div class="btn btn-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</div>*/}
                    <Button
                        color='light'
                        // onClick={() => gotoPage(0)} // onPageChange with 0 index? etc JSON
                        onClick={() => onPageChange(0,pageSize)} // onPageChange with 0 index? etc JSON
                        disabled={!canPreviousPage}
                    >
                        <FirstPageIcon/>
                    </Button>
                    <Button
                        color='light'
                        // onClick={previousPage} // onPageChange with pageIndex-1 index? etc JSON
                        onClick={() => onPageChange(pageIndex-1,pageSize)} // onPageChange with pageIndex-1 index? etc JSON
                        disabled={!canPreviousPage}
                    >
                        <ChevronLeftIcon/>
                    </Button>
                    <Button color='light'
                        // onClick={nextPage} // onPageChange with pageIndex+1 index? etc JSON
                            onClick={() => onPageChange(pageIndex+1,pageSize)} // onPageChange with pageIndex+1 index? etc JSON
                            disabled={!canNextPage}>
                        <ChevronRightIcon/>
                    </Button>
                    <Button
                        color='light'
                        onClick={() => gotoPage(pageCount - 1)} // onPageChange with pageCount-1 index? etc JSON
                        disabled={!canNextPage}
                    >
                        <LastPageIcon/>
                    </Button>
                </Col>

                {/*<Col md={3}>*/}
                {/*    <Button color='primary' onClick={nextPage} disabled={!canNextPage}>*/}
                {/*        {'>'}*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        color='primary'*/}
                {/*        onClick={() => gotoPage(pageCount - 1)}*/}
                {/*        disabled={!canNextPage}*/}
                {/*    >*/}
                {/*        {'>>'}*/}
                {/*    </Button>*/}
                {/*</Col>*/}
            </Row>
        </Fragment>
    );
};

export default TableContainer;