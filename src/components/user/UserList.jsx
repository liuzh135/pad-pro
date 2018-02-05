/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 用户列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import BaseTableData from "../data/BaseTableData";
import {Icon} from "antd";
import AddRoleView from "./AddRoleView";
import AddUserView from "./AddUserView";

export default class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devicelist: [],
            pagination: {},
            loading: false,
            visible: false,
            addLoading: false,
        }
    }

    componentDidMount() {

    }

    addRole = () => {
        console.log("添加新角色");
        this.showModal();
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        this.setState({ addLoading: true });
        setTimeout(() => {
            this.setState({ addLoading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        let tableComs = new BaseTableData();
        let devices = this.state.devicelist || [];
        return (
            <div>
                <span className="ptext-search" style={{ marginBottom: '0' }}>用户管理</span>
                <div style={{ float: 'right', marginRight: '30px' }} onClick={this.addRole}>
                    <Icon type="plus-square"/> <span className="add-role">新增用户</span>
                </div>
                <div className="input-search" style={{ marginTop: '0' }}>
                    <ExtBaseicTable columns={tableComs.device_user_columns}
                                    data={devices}
                                    pagination={this.state.pagination}
                                    loading={this.state.loading}
                                    bordered={true}
                                    style={{ padding: '0 10px', clear: 'both' }}
                                    onChange={this.handleTableChange}/>
                </div>

                <AddUserView
                    title="添加用户" submitText="保存" cancelText="取消"
                    visible={this.state.visible}
                    addLoading={this.state.addLoading}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                />
            </div>
        );
    }

}