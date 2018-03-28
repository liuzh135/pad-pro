/**
 * @fileName: ResourceList.jsx
 * Created on 2018-02-03
 * 权限资源列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {Modal} from 'antd';
import {delPermissionList, getPermissionList} from "../../axios";
import {FormattedMessage} from "react-intl";

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

        this.renderStateContent = (value, row, index) => {
            return {
                children: value === 1 ? <span className="status_nomal"><FormattedMessage id="normal"/></span> :
                    <span className="status_lock"><FormattedMessage id="locked"/></span>,
                props: {},
            };
        };

        this.device_resource_columns = [
            {
                title: <FormattedMessage id="permissionId"/>,
                dataIndex: 'permissionId',
                width: 150,
            }, {
                title: <FormattedMessage id="systemId"/>,
                dataIndex: 'systemId',
                width: 150,
            }, {
                title: <FormattedMessage id="pid"/>,
                dataIndex: 'pid',
                width: 150,
            }, {
                title: <FormattedMessage id="name"/>,
                dataIndex: 'name',
                width: 250,
            }, {
                title: <FormattedMessage id="permissionValue"/>,
                dataIndex: 'permissionValue',
                width: 350,
            }, {
                title: <FormattedMessage id="uri"/>,
                dataIndex: 'uri',
                width: 250,
            }, {
                title: <FormattedMessage id="status"/>,
                dataIndex: 'status',
                width: 150,
                render: this.renderStateContent
            }, {
                title: <FormattedMessage id="ctime"/>,
                dataIndex: 'ctime',
                width: 250,
            }, {
                title: <FormattedMessage id="operation"/>,
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
            }} className="table-span" style={{ marginRight: '4px' }}> <FormattedMessage id="edit"/></span>
            <span onClick={() => {
                this.delRole(row)
            }} className="table-span" style={{ marginLeft: '4px' }}> <FormattedMessage id="delete"/></span>
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
                _this.delPermissionList(row.permissionId);
            },
            onCancel() {
            },
        });
    };

    render() {
        let devices = this.state.rolelist || [];
        return (

            <div className="input-search" style={{ marginTop: '0' }}>
                <ExtBaseicTable columns={this.device_resource_columns}
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