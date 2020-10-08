import React, {Fragment, useEffect} from 'react';
import {useTable, usePagination} from 'react-table';
import Loader from './components/UI/Loader/Loader'

import {messages} from "./messages/messages";

import {Button, Col, CustomInput, Row, Table} from 'reactstrap';
// import { Filter, DefaultColumnFilter } from './filters';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from "axios";

// fetchData method to our Table component that will be used to fetch
// new data when pagination occurs
// Add isLoading & isError state to let our table know it's loading new data or Error

const TableContainer = ({
                            columns,
                            data,
                            fetchData,
                            isLoading,
                            isError,
                            pageCount: controlledPageCount,
                            noDataText,
                            noFilteredDataText,
                            renderRowSubComponent
                        }) => {

    // Use the state and functions returned from useTable to handcraft your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of using 'rows', use page (contains the rows for active page)

        // THESE ARE LITERALLY SUGAR on react-table cake ;)
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

        // Get the state from the instance
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            // initialState: {pageIndex: 0, pageSize: 10},
            initialState: {pageIndex: 0},
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        // useFilters,
        // useSortBy,
        // useExpanded,
        usePagination
    );

    useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize])


    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));

        //Go To Page 0 after changing PageSize
        // gotoPage(0);
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
                                    {row.isExpanded && (
                                        <tr>
                                            <td colSpan={visibleColumns.length}>
                                                {renderRowSubComponent(row)}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            );
                        })}
                        </tbody>
                    </Table>}


            {/*Building pagination right here!        */}

            <Row style={{maxWidth: 1000, margin: '0 auto', textAlign: 'center'}}>

                <Col md={4}>
                    <CustomInput
                        id='0'
                        type='select'
                        value={pageSize}
                        onChange={e => onChangeInSelect(e)}
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
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        <FirstPageIcon/>
                    </Button>
                    <Button
                        color='light'
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        <ChevronLeftIcon/>
                    </Button>
                    <Button color='light' onClick={nextPage} disabled={!canNextPage}>
                        <ChevronRightIcon/>
                    </Button>
                    <Button
                        color='light'
                        onClick={() => gotoPage(pageCount - 1)}
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