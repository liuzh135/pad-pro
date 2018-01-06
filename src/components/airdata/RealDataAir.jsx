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
import {getDeviceMapList} from '../../axios';

class RealDataAir extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            deviceId: 0,
            first: false,
            devicelist: [],
            pagination: {},
            loading: false,
        };
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

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {

    }

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
                        pageSize: 10,
                        current: data.page
                    }
                });

                //获取到设备列表了
                this.getDeviceDate({
                    deviceId: data.rows[0].deviceId,
                    date: this.state.date
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });
    };

    render() {
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" : <EchartsEffectScatter title= ""/>;
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