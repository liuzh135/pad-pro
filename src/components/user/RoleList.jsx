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