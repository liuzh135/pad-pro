/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 设备分析-实时数据
 */

import React from "react";
import {Button, Col, Dropdown, Menu, message, Row, Icon, Radio, Progress} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {ProgressStyle} from "../ProgressStyle";
import {AirDataProgress} from "../AirDataProgress";
import BarStyleProgress from "../BarStyleProgress";

class RealDeviceData extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            echartsFlag: false,
            mac: '设备MAC',
            menuJson: [
                { key: "1", value: "aabbccdd" },
                { key: "2", value: "11223344" },
                { key: "3", value: "55667788" },
                { key: "4", value: "88996622" },
            ],
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
        console.log("auth +++++" + JSON.stringify(this.props.auth));

        const { fetchData } = this.props;
        //调用 http请求 获取网络数据
        //fetchData({funcName: 'admin', stateName: 'auth'});
    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {

    }


    handleMenuClick = (e) => {
        message.info('device Mac :' + this.state.menuJson[e.key - 1].value);
        console.log('click', this.state.menuJson[e.key - 1].value);
        this.setState({
            mac: this.state.menuJson[e.key - 1].value
        });
    };

    componentDidMount() {
    }

    getMenuJon() {
        let menus = [];
        this.state.menuJson.map(function (data) {
            menus.push(<Menu.Item key={data.key}>{data.value}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }


    render() {

        let mac = this.state.mac;
        let menu = this.getMenuJon() || '';
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
                        <Col className="gutter-row " md={10}
                             style={{ padding: '30px' }}>
                            <ProgressStyle className='progress_index' width={250} height={250} progress="0.59"
                                           proressValue="RH: 59%" value="59"/>
                        </Col>
                        <Col className="gutter-row" md={14}
                             style={{}}>
                            <div className='flex-center' style={{
                                justifyContent: 'space-around', marginTop: '70px', marginBottom: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '5px'
                            }}>
                                <AirDataProgress color='#C54AD1' className='progress_a' width={150} height={150}
                                                 progress="0.3"
                                                 pm="PM1" pmValue="38"/>
                                <AirDataProgress color='#ADF5F3' className='progress_b' width={150} height={150}
                                                 progress="0.5"
                                                 pm="PM2.5" pmValue="43"/>
                                <AirDataProgress color='#CB3FF7' className='progress_c' width={150} height={150}
                                                 progress="0.3"
                                                 pm="PM10" pmValue="38"/>
                            </div>

                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='TVOG' prosName1='ppb' prosName2='μg/m3' prosgress1={50}
                                              prosgress2={20}/>
                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='HCHO' prosName1='ppb' prosName2='μg/m3' prosgress1={50}
                                              prosgress2={30}/>

                        </Col>
                        <Col className="gutter-row flex-center" md={8}>
                            <BarStyleProgress airName='ECO2' prosName1='ppm' prosName2='μg/m3' prosgress1={50}
                                              prosgress2={40}/>
                        </Col>
                    </Row>

                </Row>

            </div>
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


export default connect(mapStateToPorps, mapDispatchToProps)(RealDeviceData);