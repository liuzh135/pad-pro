/**
 * @fileName: OnlineDeviceInfo.jsx
 * Created on 2018-02-01
 * 空气趋势表
 */
import React from "react";

import {Alert, Button, Col, InputNumber} from 'antd';
import BaseTableData from "../data/BaseTableData";
import EcharCom from "../bar/EcharCom";
import BaseEcharView from "../bar/BaseEcharView";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {getDeviceDataByCityName} from "../../axios";


export class OnlineDeviceInfo extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            devicelist: [],
            pagination: {},
            loading: false
        }

    }

    componentDidMount() {
        const { addr } = this.props;
        this.getOnlineDevices({
            cityName: addr.cityName,
            rows: 10,
            page: 1
        });
    }

    componentWillReceiveProps(nextProps) {
        const { addr } = nextProps;
        this.getOnlineDevices({
            cityName: addr.cityName,
            rows: 10,
            page: 1
        });
    }

    getOnlineDevices = (parm) => {
        const { addr } = this.props;
        if (addr != null && addr.cityName != null) {
            this.setState({ loading: true });
            getDeviceDataByCityName(parm).then((data) => {
                if (data != null && data.rows != null) {
                    this.setState({
                        loading: false,
                        devicelist: data.rows,
                        pagination: {
                            total: data.records,
                            pageSize: 10,
                            current: data.page
                        }
                    });
                } else {
                    this.setState({
                        loading: false,
                        devicelist: [],
                    });
                }
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err)
            });
        }
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.page = pagination.page;
        this.setState({
            pagination: pager
        });
        this.getDevices({
            rows: pagination.pageSize,
            page: pagination.current,
            ...filters
        });
    };


    render() {
        let tableComs = new BaseTableData();
        let devices = this.state.devicelist || [];

        return (<ExtBaseicTable columns={tableComs.comIssue_columns}
                                data={devices}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered={true}
                                style={{ padding: '0 10px', clear: 'both' }}
                                onChange={this.handleTableChange}/>);
    }
}