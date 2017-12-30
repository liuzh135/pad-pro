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
import Mqtt from 'mqtt';

class RealDataAir extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            echartsFlag: false,
            first: false,
            expand: false,
            queryParam: {
                'activityId': 1,//活动ID
                'statisDate': d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate(),//查询日期默认当天
                'userType': 1,//
            }
        };

        // let clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
        // let options = {
        //     keepalive: 10,
        //     port: 8083,
        //     host: '120.77.252.48',
        //     protocol: 'mqtt',
        //     clientId: clientId,
        //     protocolId: 'MQTT',
        //     protocolVersion: 4,
        //     clean: true,
        //     reconnectPeriod: 1000,
        //     connectTimeout: 30 * 1000,
        //     will: {
        //         topic: 'WillMsg',
        //         payload: 'Connection Closed abnormally..!',
        //         qos: 0,
        //         retain: false
        //     },
        //     username: 'admin',
        //     password: 'public',
        //     rejectUnauthorized: false
        // };
        //
        // let client = Mqtt.connect(options);
        // client.on('connect', function () {
        //     client.subscribe('presence');
        //     client.publish('presence', 'Hello mqtt')
        // });
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

    componentDidMount() {
        let first = this.state.first || false;
        if (!first) {
            this.setState({
                first: true
            });
        }

    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {

    }

    render() {
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" : <EchartsEffectScatter/>;
        return (
            <Row gutter={16} style={{ height: '100%' }}>
                <Col className="gutter-row" md={24} style={{ height: '100%' }}>
                    <div className="gutter-box" style={{ height: '100%' }}>
                        {ecahrs}
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