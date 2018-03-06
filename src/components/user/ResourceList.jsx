/**
 * @fileName: ResourceList.jsx
 * Created on 2018-02-03
 * 权限资源列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {Modal} from 'antd';
import {delPermissionList, getPermissionList} from "../../axios";

const confirm = Modal.confirm;
export default class ResourceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rolelist: [],
            pagination: {},
            loading: false,
            visibleDel: false
        };
        this.device_resource_columns = [
            {
                title: '编号',
                dataIndex: 'permissionId',
                width: 150,
                render: this.renderContent
            }, {
                title: '所属系统',
                dataIndex: 'systemId',
                width: 150,
                render: this.renderContent
            }, {
                title: '所属上级',
                dataIndex: 'pid',
                width: 150,
                render: this.renderContent
            }, {
                title: '权限名称',
                dataIndex: 'name',
                width: 150,
                render: this.renderContent
            }, {
                title: '权限值',
                dataIndex: 'permissionValue',
                width: 350,
                render: this.renderContent
            }, {
                title: '路径',
                dataIndex: 'uri',
                width: 250,
                render: this.renderContent
            },{
                title: '状态',
                dataIndex: 'status',
                width: 150,
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
        this.getPermissionList({
            rows: 10,
            page: 1
        });
    }

    componentWillReceiveProps(nextProps) {
        const { searchValue } = nextProps;
        let search = this.props.searchValue;
        if (search !== searchValue) {
            this.getPermissionList({
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
    getPermissionList = (params = {}) => {
        this.setState({ loading: true });
        getPermissionList(params).then(data => {
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
        this.getPermissionList({
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
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editRole(row)
            }} className="table-span" style={{ marginRight: '4px' }}>编辑</span>
            <span onClick={() => {
                this.delRole(row)
            }} className="table-span" style={{ marginLeft: '4px' }}>删除</span>
        </div>;
    };

    delPermissionList = (ids) => {
        this.setState({
            loading: true
        });
        delPermissionList(ids).then(data => {
            this.setState({
                loading: false
            });
            if (data != null && data.code === 0) {
                const pager = { ...this.state.pagination };
                this.getPermissionList({
                    rows: pager.pageSize,
                    page: pager.current,
                    search: this.props.searchValue,
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log("err:" + err);
        })
    };

    showDeleteConfirm = (row) => {
        let _this = this;
        confirm({
            title: '删除权限资源',
            content: '确认删除' + row.name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log("确认删除权限资源");
                _this.delPermissionList(row.permissionId);
            },
            onCancel() {
                console.log("取消删除权限资源");
            },
        });
    };

    render() {
        let devices = this.state.rolelist || [];
        return (

            <div className="input-search" style={{ marginTop: '0' }}>
                <ExtBaseicTable columns={this.device_resource_columns}
                                data={devices}
                                rowKey={rowkey => {
                                    if (rowkey.status === 1) rowkey.status = <span className="status_nomal">正常</span>;
                                    return rowkey.permissionId;
                                }}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered={true}
                                style={{ padding: '0 10px', clear: 'both' }}
                                onChange={this.handleTableChange}/>
            </div>
        );
    }

}