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
import {BaseComponent} from "../BaseComponent";
import {FormattedMessage} from "react-intl";


export class OnlineDeviceInfo extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            devicelist: [],
            pagination: {},
            loading: false
        }

        //默认表头 适配
        this.comIssue_columns = [
            {
                title: <FormattedMessage id="monitoring_site_id"/>,
                dataIndex: 'deviceId',
                width: 100,
                render: this.renderContent
            }, {
                title: <FormattedMessage id="pm1"/>,
                Entitle: 'PM1',
                width: 100,
                dataIndex: 'pm1',
                render: this.renderContent
            }, {
                title: <FormattedMessage id="pm10"/>,
                Entitle: 'PM10',
                width: 100,
                dataIndex: 'pm10',
                render: this.renderContent
            }, {
                title: <FormattedMessage id="pm25"/>,
                Entitle: 'PM25',
                width: 100,
                dataIndex: 'pm25',
                render: this.renderContent
            }, {
                title: <FormattedMessage id="primary_pollutants"/>,
                Entitle: 'Primary Pollutants',
                width: 100,
                dataIndex: 'mainPm',
                render: this.renderContent
            }, {
                title: <FormattedMessage id="upload_time"/>,
                Entitle: 'Upload Time',
                width: 150,
                dataIndex: 'upTime',
                render: this.renderContent
            }
        ];
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
        const oldAddr = this.props.addr;
        if (addr !== oldAddr) {
            this.getOnlineDevices({
                cityName: addr.cityName,
                rows: 10,
                page: 1
            });
        }
    }

    getMax = (a, b, c) => {
        return a > b ? (a > c ? a : c) : (b > c ? b : c);
    };

    reviewDataList = (dataList = []) => {
        let Templist = [];
        dataList.map((data) => {
            let TempData = data;
            let mainPm = this.getMax(TempData.pm1, TempData.pm10, TempData.pm25);
            let mainpmstring = '';
            switch (mainPm) {
                case TempData.pm1:
                    mainpmstring = "PM1";
                    break;
                case TempData.pm10:
                    mainpmstring = "PM10";
                    break;
                case TempData.pm25:
                    mainpmstring = "PM2.5";
                    break;
                default:
                    break;
            }
            TempData.mainPm = mainpmstring;
            Templist.push(TempData);
        });
        return Templist;

    };

    getOnlineDevices = (parm) => {
        if (parm != null && parm.cityName != null) {
            this.setState({ loading: true });
            getDeviceDataByCityName(parm).then((data) => {
                if (data != null && data.rows != null) {
                    let dataList = this.reviewDataList(data.rows);
                    this.setState({
                        loading: false,
                        devicelist: dataList,
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

        return (<ExtBaseicTable columns={this.comIssue_columns}
                                data={devices}
                                pagination={this.state.pagination}
                                loading={this.state.loading}
                                bordered={true}
                                style={{ padding: '0 10px', clear: 'both' }}
                                onChange={this.handleTableChange}/>);
    }
}