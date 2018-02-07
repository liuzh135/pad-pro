/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 设备分析-实时数据
 */

import React from "react";
import {Button, Col, Dropdown, Icon, Menu, DatePicker, Row, Layout} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {ProgressStyle} from "../ProgressStyle";
import {AirDataProgress} from "../AirDataProgress";
import BarStyleProgress from "../BarStyleProgress";
import {getDeivceList, getDeviceRealData, getDeviceDataHistoryByDeviceId} from '../../axios';
import moment from "moment";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import BaseTableData from "../data/BaseTableData";
import {VirtualMachineView} from "./VirtualMachineView";
import HistoryEcharView from "./HistoryEcharView";
import {HistoryMachineView} from "../manager/HistoryMachineView";
import {DynamicEcharView} from "./DynamicEcharView";

const { RangePicker } = DatePicker;

class RealDeviceData extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            echartsFlag: false,
            mac: '设备MAC',
            devicelist: [],
            pagination: {},
            loading: false,
            uuid: '',
            deviceId: 0,
            startDate: this.getLocDate(),
            endDate: this.getLocDate(),
            renderData: {},
            renderRealData: {},
            historyRealData: [],
            paginationHis: {},
            loadingHis: false,
        };
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        //调用 http请求 获取网络数据
        //fetchData({funcName: 'admin', stateName: 'auth'});
    }

    componentDidMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {
        const { connect } = this.props;
        console.log("mqtt connect===connect=============》" + connect);
        //接受数据  渲染UI
        if (connect && connect.mqdata != null) {
            console.log("mqtt connect===Client=============》" + connect.client);
            console.log("mqtt connect===data=============》" + JSON.parse(connect.mqdata).data);
            console.log("mqtt connect===UUID=============》" + this.state.uuid);
            console.log("mqtt connect===dataUUID=============》" + (JSON.parse(connect.mqdata).data).uuid);
            this.setState({
                renderData: JSON.parse(connect.mqdata).data
            });
        }
    }

    getLocDate = () => {
        let date = new Date();
        let seperator = "-";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return (1900 + date.getYear()) + seperator + month + seperator + strDate;
    };

    GetQueryString = (name) => {
        let url = window.location.href.substr(1);
        if (url.indexOf(name + "=")) {
            let deviecID = url.split(name + "=");
            if (deviecID.length === 2) {
                return deviecID[1];
            }
        }
        return null;
    };

    /**
     *  这里查看是否是设备列表传进来的数据 deviceId
     *
     */
    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            if (data.rows != null && data.rows.length > 1) {
                let deviceId = this.GetQueryString("deviceId");
                console.log("GetQueryString deviceId =" + deviceId);
                let mac = data.rows[0].deviceName;
                let uuid = data.rows[0].uuid;
                let realDeviceId = data.rows[0].deviceId;
                let isSearch = false;
                for (let i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].deviceId === parseInt(deviceId)) {
                        mac = data.rows[i].deviceName;
                        uuid = data.rows[i].uuid;
                        realDeviceId = data.rows[i].deviceId;
                        isSearch = true;
                    }
                }
                if (!isSearch && deviceId != null) {
                    console.log("设备不再当前列表,列表id: " + params.page);
                    console.log("请求下一个列表");
                    this.getDevices({
                        rows: 10,
                        page: params.page + 1
                    });
                } else {
                    console.log("设备在当前列表" + realDeviceId);
                    this.setState({
                        loading: false,
                        devicelist: data.rows,
                        mac: mac,
                        uuid: uuid,
                        deviceId: realDeviceId,
                        pagination: {
                            total: data.records,
                            pageSize: 10,
                            current: data.page
                        }
                    });

                    //http 获取一次数据
                    this.getRealData(realDeviceId);

                    this.getHistoryByDeviceId(realDeviceId, this.state.startDate, this.state.endDate, {
                        page: 1,
                        rows: 10
                    });
                    //监听mqtt 数据
                    const { connect } = this.props;
                    if (connect.client != null) {
                        console.log("mqtt connect===UUID=============》" + "/device/air/airmonitor/" + uuid);
                        connect.client.subscribe("/device/air/airmonitor/" + uuid);
                    }
                }

            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });
    };

    getRealData = (deviceId) => {
        getDeviceRealData(deviceId).then(data => {
            console.log("data deviceId " + deviceId + "  data=" + JSON.stringify(data));
            if (data.code === 0 && data.data !== null) {
                this.setState({
                    renderRealData: data.data
                });
            }
        }).catch(err => {
            console.log(err)
        });
    };

    getHistoryByDeviceId = (deviceId, startDate, endDate, params) => {
        this.setState({ loadingHis: true });
        getDeviceDataHistoryByDeviceId({
            ...params,
            deviceId: deviceId,
            startTime: startDate,
            endTime: endDate
        }).then(data => {
            if (data != null && data.rows !== null) {
                this.setState({
                    historyRealData: data.rows,
                    loadingHis: false,
                    paginationHis: {
                        total: data.records,
                        pageSize: 10,
                        current: data.page
                    }
                });
            } else {
                this.setState({
                    loadingHis: false
                });
            }
        }).catch(err => {
            this.setState({
                loadingHis: false
            });
            console.log(err)
        });
    };

    isEmpty = (obj) => {
        if (obj === null) return true;
        if (typeof obj === 'undefined') {
            return true;
        }
        if (typeof obj === 'string') {
            if (obj === "") {
                return true;
            }
            var reg = new RegExp("^([ ]+)|([　]+)$");
            return reg.test(obj);
        }
        return false;
    };

    handleMenuClick = (e) => {
        // message.info('device Mac :' + this.state.devicelist[e.key].deviceName);
        console.log('click', this.state.devicelist[e.key].deviceName);
        const { connect } = this.props;
        let uuid = this.state.uuid;
        if (connect.client != null) {
            if (this.isEmpty(uuid)) {
                connect.client.unsubscribe("/device/air/airmonitor/" + this.state.uuid);
            }

            //http 获取一次设备数据   设备切换
            this.getRealData(this.state.devicelist[e.key].deviceId);
            //http 获取一次设备历史数据   设备切换
            this.getHistoryByDeviceId(this.state.devicelist[e.key].deviceId, this.state.startDate, this.state.endDate, {
                page: 1,
                rows: 10
            });
            console.log("mqtt connect===UUID=============》" + "/device/air/airmonitor/" + this.state.devicelist[e.key].uuid);
            connect.client.subscribe("/device/air/airmonitor/" + this.state.devicelist[e.key].uuid);
        }
        this.setState({
            mac: this.state.devicelist[e.key].deviceName,
            uuid: this.state.devicelist[e.key].uuid,
            deviceId: this.state.devicelist[e.key].deviceId,
        });
    };

    handOnChangeTime = (dates, dateStrings) => {
        console.log("dateStrings" + dateStrings[0] + "  " + dateStrings[1]);
        this.setState({
            startDate: dateStrings[0],
            endDate: dateStrings[1],
        });
        //查询时间段的数据
        this.getHistoryByDeviceId(this.state.deviceId, dateStrings[0], dateStrings[1], {
            page: 1,
            rows: 10
        });
    };

    handleTableChange = (paginationHis, filters, sorter) => {
        const pager = { ...this.state.paginationHis };
        pager.page = paginationHis.page;
        this.setState({
            pagination: pager
        });
        this.getHistoryByDeviceId(this.state.deviceId, this.state.startDate, this.state.endDate, {
            rows: paginationHis.pageSize,
            page: paginationHis.current,
            ...filters
        });
    };

    getMenuJon() {
        let menus = [];
        this.state.devicelist.map((data, index) => {
            menus.push(<Menu.Item key={index}>{data.deviceName}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }

    render() {

        let mac = this.state.mac;
        let menu = this.getMenuJon() || '';
        let renderData = this.state.renderData || {};
        let renderRealData = this.state.renderRealData || {};
        let uuid = this.state.uuid;
        let dataUid = renderData.uuid || renderRealData.uuid;
        const { connect } = this.props;
        if (uuid !== dataUid) {
            renderData = {};
            renderRealData = {};
            connect && connect.client && connect.client.unsubscribe("/device/air/airmonitor/" + dataUid);
        }
        let temp = renderData.mcu ? renderData.mcu.t : renderRealData.t ? renderRealData.t : '0';
        let rh = renderData.mcu ? renderData.mcu.rh : renderRealData.rh ? renderRealData.rh : '0';
        let pm25 = renderData.mcu ? renderData.mcu.pm2_5 : renderRealData.pm25 ? renderRealData.pm25 : '0';
        let pm10 = renderData.mcu ? renderData.mcu.pm10 : renderRealData.pm10 ? renderRealData.pm10 : '0';
        let pm1 = renderData.mcu ? renderData.mcu.pm1 : renderRealData.pm1 ? renderRealData.pm1 : '0';
        let eco2 = renderData.mcu ? renderData.mcu.eco2 : renderRealData.eco2 ? renderRealData.eco2 : '0';
        let eco2_mg = renderData.mcu ? renderData.mcu.eco2_mg : renderRealData.eco2Mg ? renderRealData.eco2Mg : '0';
        let hcho = renderData.mcu ? renderData.mcu.hcho : renderRealData.hcho ? renderRealData.hcho : '0';
        let hcho_ug = renderData.mcu ? renderData.mcu.hcho_ug : renderRealData.hchoUg ? renderRealData.hchoUg : '0';
        let tvoc = renderData.mcu ? renderData.mcu.tvoc : renderRealData.tvoc ? renderRealData.tvoc : '0';
        let tvoc_ug = renderData.mcu ? renderData.mcu.tvoc_ug : renderRealData.tvocUg ? renderRealData.tvocUg : '0';

        let VirtualData = {
            temp, rh, pm25, pm10, pm1, eco2, eco2_mg, hcho, hcho_ug, tvoc, tvoc_ug
        };

        const dateFormat = 'YYYY-MM-DD';
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let histroyData = this.state.historyRealData || [];


        let hisViewData = {
            dateFormat,
            startDate,
            endDate,
            histroyData,
            loadingHis: this.state.loadingHis,
            paginationHis: this.state.paginationHis,
        };

        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff', height: "100%" }}>
                <div className="gutter-box" style={{ padding: '2px 15px' }}>
                    <div className="text-title">
                        <span style={{ marginLeft: "15px" }}>设备实时采集数据</span>
                    </div>
                    <div className="input-search">
                        <span className="device_text">设备名称</span>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{ margin: 10 }}>
                                {mac} <Icon type="down"/>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                {/*<DynamicEcharView/>*/}
                <VirtualMachineView dataSource={VirtualData}/>
                <HistoryMachineView dataSource={hisViewData}
                                    handOnChangeTime={this.handOnChangeTime}
                                    handleTableChange={this.handleTableChange}/>

            </div>
        )
    }
}

const mapStateToPorps = state => {
    const { auth, connect = { data: {} } } = state.httpData;
    return { auth, connect };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
});


export default connect(mapStateToPorps, mapDispatchToProps)(RealDeviceData);