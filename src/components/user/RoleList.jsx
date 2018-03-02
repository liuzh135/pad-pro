/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 角色列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {Modal} from 'antd';
import {getRoleList} from "../../axios";

const confirm = Modal.confirm;
export default class RoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rolelist: [],
            pagination: {},
            loading: false,
            visibleDel: false
        };
        this.device_role_columns = [
            {
                title: '角色名称',
                dataIndex: 'title',
                width: 150,
                render: this.renderContent
            }, {
                title: '角色描述',
                dataIndex: 'description',
                width: 250,
                render: this.renderContent
            }, {
                title: '创建时间',
                dataIndex: 'ctime',
                width: 250,
                render: this.renderContent
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: this.renderOperationRole
            }
        ];

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
        if (search !== searchValue) {
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

    editRole = (row) => {
        console.log("editRole = " + row.roleId);
    };
    delRole = (row) => {
        console.log("delRole = " + row.roleId);
        this.showDeleteConfirm(row);
    };

    renderOperationRole = (value, row, index) => {
        console.log("---row" + JSON.stringify(row));
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editRole(row)
            }} className="table-span" style={{ marginRight: '4px' }}>编辑</span>
            <span onClick={() => {
                this.delRole(row)
            }} className="table-span" style={{ marginLeft: '4px' }}>删除</span>
        </div>;
    };


    showDeleteConfirm = (row) => {
        confirm({
            title: '删除角色',
            content: '确认删除' + row.title + "角色",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log("确认删除角色");
            },
            onCancel() {
                console.log("取消删除角色");
            },
        });
    };

    render() {
        let devices = this.state.rolelist || [];
        return (

            <div className="input-search" style={{ marginTop: '0' }}>
                <ExtBaseicTable columns={this.device_role_columns}
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