/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 用户列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {getUserList} from "../../axios";
import {Modal} from 'antd';
const confirm = Modal.confirm;
export default class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            pagination: {},
            loading: false,
            visibleDel: false
        };
        this.device_user_columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                width: 150,
                render: this.renderContent
            },
            {
                title: '昵称',
                dataIndex: 'realname',
                width: 150,
                render: this.renderContent
            },{
                title: '手机号码',
                dataIndex: 'phone',
                width: 250,
                render: this.renderContent
            }, {
                title: '角色名称',
                dataIndex: 'typeName',
                width: 250,
                render: this.renderContent
            }, {
                title: '创建时间',
                dataIndex: 'ctime',
                width: 150,
                render: this.renderContent
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: 150,
                render: this.renderOperationUser
            }
        ];

    }

    componentDidMount() {
        this.getUserList({
            rows: 10,
            page: 1
        });
    }

    componentWillReceiveProps(nextProps) {
        const { searchValue } = nextProps;
        let search = this.props.searchValue;
        if (search !== searchValue) {
            this.getUserList({
                rows: 10,
                page: 1,
                search: searchValue,
            });
        }
    }

    /**
     * 用户接口列表查询
     * searchValue 查询字段
     *
     */
    getUserList = (params = {}) => {
        console.log("--->" + JSON.stringify(params));
        this.setState({ loading: true });
        getUserList(params).then(data => {
            if (data != null && data.rows != null) {
                this.setState({
                    loading: false,
                    userlist: data.rows,
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
        this.getUserList({
            rows: pagination.pageSize,
            page: pagination.current,
            search: this.props.searchValue,
            ...filters
        });
    };

    editUser = (row) => {
        console.log("editRole = " + row.userId);
    };
    delUser = (row) => {
        console.log("delRole = " + row.userId);
        this.showDeleteConfirm(row);
    };
    resetPwd = (row) => {
        console.log("resetPwd = " + row.userId);
    };
    renderOperationUser = (value, row, index) => {
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editUser(row)
            }} className="table-span" style={{ marginRight: '4px' }}>编辑</span>
            <span onClick={() => {
                this.resetPwd(row)
            }} className="table-span" style={{ marginLeft: '4px' }}>重置密码</span>
            <span onClick={() => {
                this.delUser(row)
            }} className="table-span" style={{ marginLeft: '4px' }}>删除</span>
        </div>;
    };


    showDeleteConfirm = (row) => {
        confirm({
            title: '删除用户',
            content: '确认删除' + row.username + "用户",
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log("确认删除用户");
            },
            onCancel() {
                console.log("取消删除用户");
            },
        });
    };

    render() {
        let userlist = this.state.userlist || [];
        return (

            <div className="input-search" style={{ marginTop: '0' }}>
                <ExtBaseicTable columns={this.device_user_columns}
                                data={userlist}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered={true}
                                style={{ padding: '0 10px', clear: 'both' }}
                                onChange={this.handleTableChange}/>
            </div>
        );
    }

}