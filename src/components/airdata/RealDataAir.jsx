/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 实时数据
 */

import React from "react";
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import EchartsEffectScatter from '../charts/EchartsEffectScatter';
import {getDeviceMapList, getDeviceRealData} from '../../axios';
import TopMapGeoSeries from "../map/TopMapGeoSeries";

class RealDataAir extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceId: 0,
            first: false,
            devicelist: [],
            pagination: {},
            loading: false,
            showToast: false,
            params: {}
        };
        this.timer = {};
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        //调用 http请求 获取网络数据
        this.getDeviceMap();
    }

    componentDidMount() {
        let first = this.state.first || false;
        if (!first) {
            this.setState({
                first: true
            });
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    /**
     *  获取地图设备数据 展示UI
     */
    getDeviceMap = () => {
        this.setState({ loading: true });
        getDeviceMapList().then(data => {
            if (data.rows != null && data.rows.length > 1) {
                this.setState({
                    loading: false,
                    devicelist: data.rows,
                    mac: data.rows[0].deviceName,
                    deviceId: data.rows[0].deviceId,
                    pagination: {
                        total: data.records,
                        pageSize: data.total,
                        current: data.page
                    }
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });
    };


    getSeries = () => {
        let dataSource = this.state.devicelist || [];
        let seriesList = [];
        let onlineSeries = [];
        let offlineSeries = [];

        dataSource.map((data, index) => {
            if (data.address) {
                if (data.deviceOnline === 1) {
                    onlineSeries.push({
                        name: data.address,
                        value: [parseFloat(data.pointX), parseFloat(data.pointY), data.deviceOnline, data.deviceId, data.deviceName, data.pm2_5]
                    });
                } else {
                    offlineSeries.push({
                        name: data.address,
                        value: [parseFloat(data.pointX), parseFloat(data.pointY), data.deviceOnline, data.deviceId, data.deviceName, data.pm2_5]
                    });
                }
            }
        });
        seriesList.push(new TopMapGeoSeries("空气净化器", "effectScatter", onlineSeries, "#f4e925"));//在线
        seriesList.push(new TopMapGeoSeries("空气净化器", "scatter", offlineSeries, "#4e9588"));//离线
        return seriesList;
    };

    getRealData = (params) => {
        getDeviceRealData(params.value[3]).then(data => {
            if (data.code === 0 && data.data !== null) {
                console.log("getrealData =>" + JSON.stringify(data.data));
                this.setParams({
                    ...params,
                    ...data.data
                });
            } else {
                this.setParams(params);
            }
        }).catch(err => {
            this.setParams(params);
        });
    };

    setParams = (params) => {
        this.setState({
            params: params,
            showToast: true
        });
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                showToast: false
            });
        }, 8000)
    };

    onChartClick = (params) => {
        this.setState({
            showToast: false
        });
        //Toast 展示设备详情 弹出层
        //获取该设备最后的数据 显示出来
        this.getRealData(params);
    };

    getTextView = (text, obj, unit) => {
        return obj ?
            <div><span className="span_toast">{text + " : "} </span><span
                className="span_toast_sub">{obj}{unit}</span>
            </div> : "";
    };

    getToast = () => {
        let params = this.state.params || {};
        let showToast = this.state.showToast || false;
        let tostView = {};
        let eco2 = this.getTextView("ECO2", this.state.params.eco2, "ppm");
        let eco2Mg = this.getTextView("ECO2_Mg", this.state.params.eco2Mg, "ppm");
        let hcho = this.getTextView("hcho", this.state.params.hcho);
        let hchoUg = this.getTextView("hchoUg", this.state.params.hchoUg);
        let pm1 = this.getTextView("PM1", this.state.params.pm1, "μg/m³");
        let pm10 = this.getTextView("PM10", this.state.params.pm10, "μg/m³");
        let rh = this.getTextView("RH", parseInt(this.state.params.rh || 0) / 100, "%");
        let pm25 = this.getTextView("pm25", this.state.params.pm25, "μg/m³");
        let t = this.getTextView("TEMP", parseInt(this.state.params.t || 0) / 100, "℃");

        let tvoc = this.getTextView("tvoc", this.state.params.tvoc);
        let tvocUg = this.getTextView("tvocUg", this.state.params.tvocUg);
        let upTime = this.getTextView("upTime", this.state.params.upTime);
        let createTime = this.getTextView("createTime", this.state.params.createTime);


        if (params !== {} && params.value != null) {
            let deviceIdString = params.value[3];
            let deviceId = this.getTextView("设备ID", deviceIdString);
            let deviceNameString = params.value[4];
            let deviceName = this.getTextView("设备名称", deviceNameString);
            let deviceStatusString = params.value[2] === 0 ? "离线" : "在线";
            let deviceStatus = this.getTextView("设备状态", deviceStatusString);
            tostView = <div className="anim_fade_image toast_base toast_text">
                {deviceId}
                {deviceName}
                {deviceStatus}
                {eco2}
                {eco2Mg}
                {pm1}
                {pm10}
                {pm25}
                {rh}
                {t}
            </div>
        }
        return showToast ? tostView : "";
    };

    render() {
        let toastView = this.getToast();

        //组合地图数据 series []
        let series = this.getSeries();

        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" :
            <EchartsEffectScatter onEventClick={this.onChartClick} dataSource={series} subtitle="空气检测仪全国分布图"
                                  title="全国空气详情信息"/>;

        return (
            <Row gutter={16} style={{ height: '100%' }}>
                <Col className="gutter-row" md={24} style={{ height: '100%' }}>
                    <div className="gutter-box" style={{ height: '100%' }}>
                        {ecahrs}
                        {toastView}
                    </div>
                </Col>
            </Row>
        )
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(RealDataAir);