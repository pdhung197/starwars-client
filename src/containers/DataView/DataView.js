import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { getDataListPerPage } from './../../actions/dataActions';

import DetailView from './../DetailView/DetailView';

import StripedTable from './../../components/DataTable/StripedTable';

import { dataViewHeaders } from './dataHeader';

class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            footerData: {
                page: 1,
                count: 0,
                totalPage: 0,
                limit: 10
            },
            detailCharacter: null
        }
    }

    //#region 'Data region'

    /* Function call action to fetch data depending on dataName (eg: Planet, Vehicles ...) */
    handleFetchData = (dataName, page) => {
        getDataListPerPage(dataName, page)
            .then(res => {
                const {
                    data: {
                        count = 0,
                        results = []
                    } = {}
                } = res || {};

                this.setState({
                    dataList: results,
                    footerData: {
                        ...this.state.footerData,
                        page,
                        count,
                        totalPage: Math.ceil(count / this.state.footerData.limit)
                    }
                })
            })
            .catch(error => {
                console.log({ error });
            });
    }
    //#endregion 'Data region'

    //#region 'Life circle'
    componentDidMount() {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        const {
            footerData: {
                page = 1
            } = {}
        } = this.state || {};

        this.handleFetchData(dataName, page);
    }

    shouldComponentUpdate(nextProps) {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};
        const {
            match: {
                params: {
                    dataName: nextDataName
                } = {}
            } = {}
        } = nextProps || {};
        if (dataName !== nextDataName) {
            /* If data name is changed, reset status of datatable to fetch new data */
            this.setState({
                footerData: {
                    page: 1,
                    count: 0,
                    totalPage: 0,
                    limit: 10
                },
                detailCharacter: null
            }, () => this.handleFetchData(nextDataName, 1));
        }

        return true;
    }
    //#endregion 'Life circle'

    //#region 'Table event handle region'
    handleChangeActivedPage = (page) => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        this.handleFetchData(dataName, page);
    }

    handleNextOrPreviousPage = (nextOrPrv) => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        const { page } = this.state.footerData;

        this.handleFetchData(dataName, nextOrPrv === 'prv' ? page - 1 : page + 1);
    }

    handleCloseDetailView = () => {
        this.setState({
            detailCharacter: null
        })
    }

    handleGetDetailItem = (detailCharacter) => {
        this.setState({
            detailCharacter: {
                title: detailCharacter.name,
                image: detailCharacter.avatar,
                body: detailCharacter
            }
        });
    };

    getTableHeaders = () => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        return (dataViewHeaders[`${dataName}Columns`] || []).reduce((TableHeaders, column) => {
            const {
                key,
                label,
                show = true
            } = column;

            if (show) {
                TableHeaders.push(<span key={key}>{label}</span>)
            }

            return TableHeaders;
        }, []);
    }

    getTableColumns = () => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        return (dataViewHeaders[`${dataName}Columns`] || []).reduce((tableColumns, column) => {
            const tableColumn = { ...column };
            switch (tableColumn.key) {
                case 'avatar':
                    tableColumn.customCell = (character) => {
                        /* Add options to image to get smaller image if it can */
                        const avatar = `${character.avatar}${(character.avatar).includes('?') ? '&width=160' : '?width=160'}`;
                        return <div
                            className="table__cell--avatar"
                        >
                            <img src={avatar} alt={character.name} />
                        </div>
                    }
                    break;
                default:
                    break;
            }
            tableColumns.push(tableColumn);

            return tableColumns;
        }, []);
    }
    //#endregion 'Table event handle region'

    render() {
        const {
            dataList,
            footerData,
            detailCharacter
        } = this.state || {};

        return (
            <div>
                <StripedTable
                    className="dataview-table"
                    bodyData={dataList}
                    tableHeaders={this.getTableHeaders()}
                    tableColumns={this.getTableColumns()}
                    footerData={footerData}
                    handleChangeActivedPage={this.handleChangeActivedPage}
                    handleNextOrPreviousPage={this.handleNextOrPreviousPage}
                    handleOnClickRow={this.handleGetDetailItem}
                />
                <DetailView
                    data={detailCharacter}
                    onHide={this.handleCloseDetailView}
                />
            </div>
        )
    }
}

export default withRouter(DataView);