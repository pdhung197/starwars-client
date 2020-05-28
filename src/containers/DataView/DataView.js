import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { getDataList } from './../../actions/dataActions';

import DetailView from './../DetailView/DetailView';

import StripedTable from './../../components/DataTable/StripedTable';
import SearchForm from './../../components/SearchForm/SearchForm';

import { dataViewHeaders } from './dataHeader';
import { collectionsList } from './../../constants/collections';

import './_DataView.scss';

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
            search: '',
            detailCharacter: null
        }
    }

    //#region 'Data region'

    /* Function call action to fetch data depending on dataName (eg: Planet, Vehicles ...) */
    handleFetchData = (dataName, params = { page: 1 }) => {
        const {
            search
        } = this.state || {};
        const {
            page = 1
        } = params;

        if (search && search.length) params.search = search;

        getDataList(dataName, params)
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

        const params = {
            page
        }
        this.handleFetchData(dataName, params);
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
                dataList: [],
                footerData: {
                    page: 1,
                    count: 0,
                    totalPage: 0,
                    limit: 10
                },
                search: '',
                detailCharacter: null
            }, () => this.handleFetchData(nextDataName, {
                page: 1
            }));
        }

        return true;
    }
    //#endregion 'Life circle'

    //#region 'Table event handle region'
    handleSearchChange = (e) => {
        const search = e.target.value;
        this.setState({ search });
    }

    handleChangeActivedPage = (page) => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        const params = {
            page
        }
        this.handleFetchData(dataName, params);
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

        const params = {
            page: nextOrPrv === 'prv' ? page - 1 : page + 1
        }
        this.handleFetchData(dataName, params);
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
                show = true,
                width,
                minWidth
            } = column;

            const style = {};

            if (width) style.width = width;
            if (minWidth) style.minWidth = minWidth;

            if (show) {
                TableHeaders.push(<div key={key} style={style}>{label}</div>)
            }

            return TableHeaders;
        }, []);
    }

    /* Get custom table columns */
    getTableColumns = () => {
        const {
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        return (dataViewHeaders[`${dataName}Columns`] || []).reduce((tableColumns, column) => {
            const tableColumn = {
                ...column
            };

            if (tableColumn.show === false) return tableColumns;

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
            match: {
                params: {
                    dataName
                } = {}
            } = {}
        } = this.props || {};

        const {
            dataList,
            footerData,
            detailCharacter,
            search
        } = this.state || {};

        return (
            <div className="dataview">
                <div className="dataview__header">
                    <div className="dataview__title">
                        <h1>{collectionsList[dataName] || 'Data'} list view</h1>
                    </div>
                    <div className="dataview__tool">
                        <SearchForm
                            onInputChange={this.handleSearchChange}
                            onSearch={() => this.handleFetchData(dataName)}
                            inputValue={search}
                            placeholder={`Enter ${dataName}'s name to search`}
                        />
                    </div>
                </div>
                <StripedTable
                    className="dataview__table"
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
                    dataName={dataName}
                />
            </div>
        )
    }
}

export default withRouter(DataView);