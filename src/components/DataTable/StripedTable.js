import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './_table.scss';

import TablePagin from './TablePagin';
import CircleLoader from './../Loader/CircleLoader';

class TableRow extends Component {
    render() {
        const {
            rowData = {},
            columns = [],
            handleOnClickRow
        } = this.props || {}

        return (
            <tr
                className={`${handleOnClickRow ? 'table__row--clickable' : ''}`}
                onClick={() => {
                    return handleOnClickRow ? handleOnClickRow(rowData) : false
                }}
            >
                {
                    columns.map((column, index) => {
                        const {
                            key,
                            customCell
                        } = column || {};
                        const cellData = customCell ? customCell(rowData) : rowData[key];

                        return <td className="" key={index}>
                            {cellData}
                        </td>
                    })
                }
            </tr>
        )
    }
}


class StripedTable extends Component {
    render() {
        const {
            tableHeaders = [],
            tableColumns = [],
            bodyData = [],
            noPagination = false,
            footerData = [],
            handleChangeActivedPage = () => { },
            handleNextOrPreviousPage = () => { },
            handleOnClickRow,
            className = '',
            isLoading = false
        } = this.props || {}
        return (
            <>
                <div className={`table-responsive ${className}`}>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                {
                                    tableHeaders.map((tableHeader, index) => {
                                        return (<th key={index}>
                                            {tableHeader}
                                        </th>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bodyData && bodyData.length ? bodyData.map((row, index) => <TableRow
                                    key={index}
                                    rowData={row}
                                    columns={tableColumns}
                                    handleOnClickRow={handleOnClickRow}
                                />)
                                    : isLoading ?
                                        <tr>
                                            <td colSpan={tableHeaders.length}>
                                                <CircleLoader />
                                            </td>
                                        </tr>
                                        : <tr>
                                            <td colSpan={tableHeaders.length}>
                                                <p className="no-data">Nothing to show</p>
                                            </td>
                                        </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    !noPagination && <TablePagin
                        paginData={footerData}
                        handleChangeActivedPage={handleChangeActivedPage}
                        handleNextOrPreviousPage={handleNextOrPreviousPage}
                    />
                }
            </>
        )
    }
}

StripedTable.propTypes = {
    bodyData: PropTypes.array.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    tableColumns: PropTypes.array.isRequired,
    footerData: PropTypes.object.isRequired,
    noPagination: PropTypes.bool,
    handleChangeActivedPage: PropTypes.func,
    handleNextOrPreviousPage: PropTypes.func,
    handleOnClickRow: PropTypes.func
}

export default StripedTable;