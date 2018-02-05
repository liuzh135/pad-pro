/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 角色列表
 */
import React from "react";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import BaseTableData from "../data/BaseTableData";
import {getDeivceList} from "../../axios";
import {Icon} from "antd";
import AddRoleView from "./AddRoleView";

export default class RoleList extends React.Component {

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
        // this.getDevices({
        //     rows: 10,
        //     page: 1
        // });
    }

    // getDevices = (params = {}) => {
    //     this.setState({ loading: true });
    //     getDeivceList(params).then(data => {
    //         if (data != null && data.rows != null) {
    //             this.setState({
    //                 loading: false,
    //                 devicelist: data.rows,
    //                 pagination: {
    //                     total: data.records,
    //                     pageSize: 10,
    //                     current: data.page
    //                 }
    //             });
    //         } else {
    //             this.setState({
    //                 loading: false
    //             });
    //         }
    //
    //     }).catch(err => {
    //         this.setState({
    //             loading: false
    //         });
    //         console.log(err)
    //     });
    // };

    // handleTableChange = (pagination, filters, sorter) => {
    //     const pager = { ...this.state.pagination };
    //     pager.page = pagination.page;
    //     this.setState({
    //         pagination: pager
    //     });
    //     this.getDevices({
    //         rows: pagination.pageSize,
    //         page: pagination.current,
    //         ...filters
    //     });
    // };
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
                <span className="ptext-search" style={{ marginBottom: '0' }}>角色管理</span>
                <div style={{ float: 'right', marginRight: '30px' }} onClick={this.addRole}>
                    <Icon type="plus-square"/> <span className="add-role">新增角色</span>
                </div>
                <div className="input-search" style={{ marginTop: '0' }}>
                    <ExtBaseicTable columns={tableComs.device_role_columns}
                                    data={devices}
                                    pagination={this.state.pagination}
                                    loading={this.state.loading}
                                    bordered={true}
                                    style={{ padding: '0 10px', clear: 'both' }}
                                    onChange={this.handleTableChange}/>
                </div>

                <AddRoleView
                    title="添加角色" submitText="保存" cancelText="取消"
                    visible={this.state.visible}
                    addLoading={this.state.addLoading}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                />
            </div>
        );
    }

}