/**
 * @fileName: RealDeviceData.jsx
 * Created on 2017-12-20
 * 设备分析-实时数据
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {getDeviceDataHistoryByDeviceId, getDeviceRealData} from '../../axios';
import {VirtualMachineView} from "./VirtualMachineView";
import {HistoryMachineView} from "../manager/HistoryMachineView";
import SelectCityAndDevice from "./SelectCityAndDevice";

class RealDeviceData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            echartsFlag: false,
            mac: '设备MAC',
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

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {
        const { connect } = this.props;
        // console.log("mqtt connect===connect=============》" + connect);
        //接受数据  渲染UI
        if (connect && connect.mqdata != null) {
            // console.log("mqtt connect===Client=============》" + connect.client);
            // console.log("mqtt connect===data=============》" + JSON.parse(connect.mqdata).data);
            // console.log("mqtt connect===UUID=============》" + this.state.uuid);
            // console.log("mqtt connect===dataUUID=============》" + (JSON.parse(connect.mqdata).data).uuid);
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


    getRealData = (deviceId) => {
        getDeviceRealData(deviceId).then(data => {
            // console.log("data deviceId " + deviceId + "  data=" + JSON.stringify(data));
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


    handOnChangeTime = (dates, dateStrings) => {
        // console.log("dateStrings" + dateStrings[0] + "  " + dateStrings[1]);
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

    /**
     * deviceId 设备Id
     * device 设备详情
     * 设备位置和设备选择都会回调这里  所有逻辑处理在这里选择就好了
     *
     */
    getSelectDevice = (deviceId, device) => {
        // console.log("select device = " + deviceId);
        // console.log("select deviceInfo = " + JSON.stringify(device));
        const { connect } = this.props;
        let uuid = this.state.uuid;
        if (connect.client != null) {
            if (!this.isEmpty(uuid)) {
                connect.client.unsubscribe("/device/air/airmonitor/" + this.state.uuid);
            }
            //http 获取一次设备数据   设备切换
            this.getRealData(deviceId);
            //http 获取一次设备历史数据   设备切换
            this.getHistoryByDeviceId(deviceId, this.state.startDate, this.state.endDate, {
                page: 1,
                rows: 10
            });
            // console.log("mqtt connect===UUID=============》" + "/device/air/airmonitor/" + device.uuid);
            connect.client.subscribe("/device/air/airmonitor/" + device.uuid);
        }
        this.setState({
            mac: device.deviceName,
            uuid: device.uuid,
            deviceId: device.deviceId,
        });
    };

    render() {
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
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff'}}>
                <div className="gutter-box" style={{ padding: '2px 15px' }}>
                    <div className="text-title">
                        <span style={{ marginLeft: "15px" }}>设备实时采集数据</span>
                    </div>
                    <div style={{ border: '1px solid #C7D3E3' }}>
                        <SelectCityAndDevice selectDevice={this.getSelectDevice} showDevice={true}/>
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