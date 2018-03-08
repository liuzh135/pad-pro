/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 角色列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {Modal} from 'antd';
import {delRoleList, getRoleList} from "../../axios";
import EditRole from "./EditRole";
import UpdateRoleJur from "./UpdateRoleJur";

const confirm = Modal.confirm;
export default class RoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rolelist: [],
            pagination: {},
            loading: false,
            visible: false,
            visibleUpdate: false,
            role: {},
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
        const { searchValue, addData } = nextProps;
        let search = this.props.searchValue;
        let addDataNew = this.props.addData;
        if (search !== searchValue) {
            this.getRoleList({
                rows: 10,
                page: 1,
                search: searchValue,
            });
        }
        if (addDataNew !== addData) {
            this.getRoleList({
                rows: 10,
                page: 1,
                search: search,
            });
        }
    }

    /**
     * 角色列表查询
     * searchValue 查询字段
     *
     */
    getRoleList = (params = {}) => {
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
        this.showEditModal(row);
    };
    updateRoleJur = (row) => {
        this.showUpdateModal(row);
    };
    delRole = (row) => {
        this.showDeleteConfirm(row);
    };

    renderOperationRole = (value, row, index) => {
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editRole(row)
            }} className="table-span" style={{ marginRight: '4px' }}>编辑</span>
            <span onClick={() => {
                this.updateRoleJur(row)
            }} className="table-span" style={{ marginRight: '4px' }}>修改权限</span>
            <span onClick={() => {
                this.delRole(row)
            }} className="table-span">删除</span>
        </div>;
    };

    delRoleUser = (ids) => {
        this.setState({
            loading: true
        });
        delRoleList(ids).then(data => {
            this.setState({
                loading: false
            });
            if (data != null && data.code === 0) {
                const pager = { ...this.state.pagination };
                this.getRoleList({
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
            title: '删除角色',
            content: <span>确认删除<span style={{ color: "#ff0000", fontSize: "16px", margin: "0 3px" }}>{row.title}</span>角色</span>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log("确认删除角色");
                _this.delRoleUser(row.roleId);
            },
            onCancel() {
                console.log("取消删除角色");
            },
        });
    };

    onRoleChange = () => {
        //修改角色信息成功
        const pager = { ...this.state.pagination };
        this.getRoleList({
            rows: pager.pageSize,
            page: pager.current,
            search: this.props.searchValue,
        });
    };
    onJurChange = () => {
        //角色权限修改成功
        console.log("--角色权限修改成功--");
    };

    showEditModal = (role) => {
        this.setState({
            visible: !this.state.visible,
            role: role
        });
    };

    showUpdateModal = (role) => {
        this.setState({
            visibleUpdate: !this.state.visibleUpdate,
            role: role
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
                <EditRole
                    title="修改角色信息" submitText="保存" cancelText="取消"
                    visible={this.state.visible}
                    role={this.state.role}
                    onRoleChange={this.onRoleChange}
                />
                <UpdateRoleJur
                    title="修改角色权限" submitText="保存" cancelText="取消"
                    visible={this.state.visibleUpdate}
                    role={this.state.role}
                    onJurChange={this.onJurChange}
                />
            </div>
        );
    }

}