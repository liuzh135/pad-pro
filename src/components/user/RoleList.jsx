/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 角色列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import BaseTableData from "../data/BaseTableData";
import {getRoleList} from "../../axios";

export default class RoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rolelist: [],
            pagination: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.getRoleList({
            rows: 10,
            page: 1
        });
    }

    componentWillReceiveProps(nextProps) {
        const { searchValue } = nextProps;
        let search = this.props.searchValue;
        if (search !== searchValue){
            this.getRoleList({
                rows: 10,
                page: 1,
                search: searchValue,
            });
        }
    }

    /**
     * 角色列表查询
     * searchValue 查询字段
     *
     */
    getRoleList = (params = {}) => {
        console.log("--->" + JSON.stringify(params));
        this.setState({ loading: true });
        getRoleList(params).then(data => {
            if (data != null && data.rows != null) {
                this.setState({
                    loading: false,
                    rolelist: data.rows,
                    pagination: {
                        total: data.records,
                        pageSize: 10,
                        current: data.page
                    }
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        })
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.page = pagination.page;
        this.setState({
            pagination: pager
        });
        this.getRoleList({
            rows: pagination.pageSize,
            page: pagination.current,
            search: this.props.searchValue,
            ...filters
        });
    };

    render() {
        let tableComs = new BaseTableData();
        let devices = this.state.devicelist || [];
        return (

            <div className="input-search" style={{ marginTop: '0' }}>
                <ExtBaseicTable columns={tableComs.device_role_columns}
                                data={devices}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered={true}
                                style={{ padding: '0 10px', clear: 'both' }}
                                onChange={this.handleTableChange}/>
            </div>
        );
    }

}