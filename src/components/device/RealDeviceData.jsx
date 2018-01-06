/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 设备分析-实时数据
 */

import React from "react";
import {Button, Col, Dropdown, Icon, Menu, message, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, mqttConnect, receiveData} from '@/action';
import {ProgressStyle} from "../ProgressStyle";
import {AirDataProgress} from "../AirDataProgress";
import BarStyleProgress from "../BarStyleProgress";
import {getDeivceList} from '../../axios';

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
            renderData: {}
        };
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        const { receiveData } = this.props;
        const { fetchData } = this.props;
        //调用 http请求 获取网络数据
        //fetchData({funcName: 'admin', stateName: 'auth'});
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

    componentDidMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
    }

    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            if (data.rows != null && data.rows.length > 1) {
                this.setState({
                    loading: false,
                    devicelist: data.rows,
                    mac: data.rows[0].deviceName,
                    uuid: data.rows[0].uuid,
                    pagination: {
                        total: data.records,
                        pageSize: 10,
                        current: data.page
                    }
                });
                const { connect } = this.props;
                if (connect.client != null) {
                    console.log("mqtt connect===UUID=============》" + "/device/air/airmonitor/" + data.rows[0].uuid);
                    connect.client.subscribe("/device/air/airmonitor/" + data.rows[0].uuid);
                }
            }
        }).catch(err => {
            this.setState({
                loading: false
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
            console.log("mqtt connect===UUID=============》" + "/device/air/airmonitor/" + this.state.devicelist[e.key].uuid);
            connect.client.subscribe("/device/air/airmonitor/" + this.state.devicelist[e.key].uuid);
        }
        this.setState({
            mac: this.state.devicelist[e.key].deviceName,
            uuid: this.state.devicelist[e.key].uuid
        });
    };

    getMenuJon() {
        let menus = [];
        this.state.devicelist.map(function (data, index) {
            menus.push(<Menu.Item key={index}>{data.deviceName}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }

    render() {
        let mac = this.state.mac;
        let menu = this.getMenuJon() || '';
        let renderData = this.state.renderData || {};
        let uuid = this.state.uuid;
        let dataUid = renderData.uuid;
        if (uuid !== dataUid) {
            renderData = {}
        }
        let temp = renderData.mcu ? renderData.mcu.t : '0';
        let rh = renderData.mcu ? renderData.mcu.rh : '0';
        let pm25 = renderData.mcu ? renderData.mcu.pm2_5 : '0';
        let pm10 = renderData.mcu ? renderData.mcu.pm10 : '0';
        let pm1 = renderData.mcu ? renderData.mcu.pm1 : '0';
        let eco2 = renderData.mcu ? renderData.mcu.eco2 : '0';
        let eco2_mg = renderData.mcu ? renderData.mcu.eco2_mg : '0';
        let hcho = renderData.mcu ? renderData.mcu.hcho : '0';
        let hcho_ug = renderData.mcu ? renderData.mcu.hcho_ug : '0';
        let tvoc = renderData.mcu ? renderData.mcu.tvoc : '0';
        let tvoc_ug = renderData.mcu ? renderData.mcu.tvoc_ug : '0';

        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff', height: "100%" }}>

                <Row gutter={10} style={{ height: "100%" }}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备实时采集数据</span>
                                </div>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button style={{ margin: 10 }}>
                                        {mac} <Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                    <Row gutter={10} className="text-center" style={{
                        margin: '100px 40px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        background: 'linear-gradient(to right bottom, #9326B7, #4C1DA6 80%, #3322A8)', width: '80%'
                    }}>
                        <Col className="gutter-row " md={6}
                             style={{ padding: '30px' }}>
                            <ProgressStyle className='progress_index' width={250} height={250}
                                           progress={(parseInt(temp) / 10000)}
                                           proressValue={"RH: " + (parseInt(rh) / 100) + "%"}
                                           value={parseInt(temp) / 100}/>
                        </Col>
                        <Col className="gutter-row" md={16}
                             style={{ float: 'right' }}>
                            <div className='flex-center' style={{
                                justifyContent: 'space-around', marginTop: '70px', marginBottom: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '5px'
                            }}>
                                <AirDataProgress color='#C54AD1' className='progress_a' width={150} height={150}
                                                 progress={parseInt(pm1) / 100}
                                                 pm="PM1" pmValue={pm1}/>
                                <AirDataProgress color='#ADF5F3' className='progress_b' width={150} height={150}
                                                 progress={parseInt(pm25) / 100}
                                                 pm="PM2.5" pmValue={pm25}/>
                                <AirDataProgress color='#CB3FF7' className='progress_c' width={150} height={150}
                                                 progress={parseInt(pm10) / 100}
                                                 pm="PM10" pmValue={pm10}/>
                            </div>

                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='TVOG' prosName1='ppb' prosName2='μg/m3'
                                              prosgress1={parseInt(tvoc)}
                                              prosgress2={parseInt(tvoc_ug)}/>
                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='HCHO' prosName1='ppb' prosName2='μg/m3'
                                              prosgress1={parseInt(hcho)}
                                              prosgress2={parseInt(hcho_ug)}/>

                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='ECO2' prosName1='ppm' prosName2='μg/m3'
                                              prosgress1={parseInt(eco2)}
                                              prosgress2={parseInt(eco2_mg)}/>
                        </Col>
                    </Row>

                </Row>

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