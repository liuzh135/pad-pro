/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 用户列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {delUserByid, getUserList} from "../../axios";
import {Modal} from 'antd';
import EditUser from "./EditUser";
import UpdateUserRole from "./UpdateUserRole";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";

const confirm = Modal.confirm;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userlist: [],
            pagination: {},
            loading: false,
            visibleUpdate: false,
            user: {}
        };
        this.renderStateContent = (value, row, index) => {
            return {
                children: value === 0 ? <span className="status_nomal"><FormattedMessage id="normal"/></span> :
                    <span className="status_lock"><FormattedMessage id="locked"/></span>,
                props: {},
            };
        };
        this.renderSexContent = (value, row, index) => {
            return {
                children: value === 0 ? <span><FormattedMessage id="man"/></span> :
                    <span><FormattedMessage id="woman"/></span>,
                props: {},
            };
        };
        this.device_user_columns = [
            {
                title: <FormattedMessage id="user_name"/>,
                dataIndex: 'username',
                width: 150,
            },
            {
                title: <FormattedMessage id="nickname"/>,
                dataIndex: 'realname',
                width: 150,
            }, {
                title: <FormattedMessage id="phone"/>,
                dataIndex: 'phone',
                width: 250,
            }, {
                title: <FormattedMessage id="sex"/>,
                dataIndex: 'sex',
                width: 150,
                render: this.renderSexContent
            }, {
                title: <FormattedMessage id="user_state"/>,
                dataIndex: 'locked',
                width: 250,
                render: this.renderStateContent
            }, {
                title: <FormattedMessage id="create_time"/>,
                dataIndex: 'ctime',
                width: 150,
            }, {
                title: <FormattedMessage id="operation"/>,
                dataIndex: 'operation',
                width: 250,
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
        const { searchValue, addData } = nextProps;
        let addDataNew = this.props.addData;
        let search = this.props.searchValue;
        if (search !== searchValue) {
            this.getUserList({
                rows: 10,
                page: 1,
                search: searchValue,
            });
        }

        if (addDataNew !== addData) {
            this.getUserList({
                rows: 10,
                page: 1,
                search: search,
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
        this.showEditModal(row)
    };
    delUser = (row) => {
        this.showDeleteConfirm(row);
    };
    resetPwd = (row) => {
        this.showUpdateModal(row);
    };

    renderOperationUser = (value, row, index) => {
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editUser(row)
            }} className="table-span" style={{ marginRight: '4px' }}><FormattedMessage id="edit"/></span>
            <span onClick={() => {
                this.resetPwd(row)
            }} className="table-span" style={{ marginLeft: '4px' }}><FormattedMessage id="modify_user_role"/></span>
            <span onClick={() => {
                this.delUser(row)
            }} className="table-span" style={{ marginLeft: '4px' }}><FormattedMessage id="delete"/></span>
        </div>;
    };

    delUserId = (ids) => {
        this.setState({
            loading: true
        });
        delUserByid(ids).then(data => {
            this.setState({
                loading: false
            });
            if (data != null && data.code === 0) {
                const pager = { ...this.state.pagination };
                this.getUserList({
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
        let { language } = this.props;
        let title = language.data === 'zhLanguage' ? "删除用户" : "Delete User";
        let content_sava = language.data === 'zhLanguage' ? "确认删除" : "confirm deletion";
        let content_user = language.data === 'zhLanguage' ? "用户" : "user";
        confirm({
            title: title,
            content: <span>{content_sava} {content_user} <span
                style={{ color: "#ff0000", fontSize: "16px", margin: "0 3px" }}>{row.realname}</span> ?</span>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                _this.delUserId(row.userId);
            },
            onCancel() {
                console.log("取消删除用户");
            },
        });
    };

    onUserChange = () => {
        //修改用户信息成功
        const pager = { ...this.state.pagination };
        this.getUserList({
            rows: pager.pageSize,
            page: pager.current,
            search: this.props.searchValue,
        });
    };

    showEditModal = (user) => {
        this.setState({
            visible: !this.state.visible,
            user: user
        });
    };

    showUpdateModal = (user) => {
        this.setState({
            visibleUpdate: !this.state.visibleUpdate,
            user: user
        });
    };

    onUserRoleChange = () => {
        console.log("修改用户角色信息成功");
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

                <EditUser
                    title={<FormattedMessage id="modifying_user_information"/>}
                    submitText={<FormattedMessage id="save_e"/>}
                    cancelText={<FormattedMessage id="cancel"/>}
                    visible={this.state.visible}
                    user={this.state.user}
                    onUserChange={this.onUserChange}
                />
                <UpdateUserRole
                    title={<FormattedMessage id="modifying_user_role_information"/>}
                    submitText={<FormattedMessage id="save_e"/>}
                    cancelText={<FormattedMessage id="cancel"/>}
                    visible={this.state.visibleUpdate}
                    user={this.state.user}
                    onUserRoleChange={this.onUserRoleChange}
                />
            </div>
        );
    }

}


const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};

export default connect(mapStateToPorps)(UserList);