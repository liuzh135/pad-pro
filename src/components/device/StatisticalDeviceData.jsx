/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 li数据
 */

import React from "react";
import {Button, Col, Dropdown, Icon, Menu, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {getDeivceList} from '../../axios';
import HistoryEcharView from "./HistoryEcharView";

class StatisticalDeviceData extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            mac: '设备MAC',
            deviceId: 0,
            date: this.getLocDate(),
            devicelist: [],
            pagination: {},
            loading: false,
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
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

    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            if (data.rows != null && data.rows.length > 1) {
                let querydeviceId = this.GetQueryString("deviceId");
                console.log("GetQueryString deviceId =" + querydeviceId);
                let mac = data.rows[0].deviceName;
                let deviceId = data.rows[0].deviceId;
                for (let i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].deviceId === parseInt(querydeviceId)) {
                        mac = data.rows[i].deviceName;
                        deviceId = data.rows[i].deviceId;
                    }
                }
                this.setState({
                    loading: false,
                    devicelist: data.rows,
                    mac: mac,
                    deviceId: deviceId,
                    pagination: {
                        total: data.records,
                        pageSize: 10,
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

    //选择设备  重新拉取线表数据
    handleMenuClick = (e) => {
        // message.info('device Mac :' + this.state.devicelist[e.key].deviceName);
        this.setState({
            mac: this.state.devicelist[e.key].deviceName,
            deviceId: this.state.devicelist[e.key].deviceId,
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
        let deviceId = this.state.deviceId;
        let menu = this.getMenuJon() || '';

        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备历史数据</span>
                                </div>
                                <div style={{ border: '1px solid rgb(233, 233, 233)' }}>
                                    <span className="device_text">设备名称</span>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Button style={{ margin: 10 }}>
                                            {mac} <Icon type="down"/>
                                        </Button>
                                    </Dropdown>
                                    <span className="device_text" style={{ marginLeft: '20px' }}>设备位置</span>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Button style={{ margin: 10 }}>
                                            {mac} <Icon type="down"/>
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <HistoryEcharView deviceId={deviceId} type={1}/>
                    <HistoryEcharView deviceId={deviceId} type={2}/>
                    <HistoryEcharView deviceId={deviceId} type={3}/>
                </Row>
                {
                    <style>
                        {`
                                .ant-table-row-level-0 > td:nth-child(1)
                                ,.ant-table-row-level-0 > td:nth-child(2)
                                ,.ant-table-row-level-0 > td:nth-child(3)
                                ,.ant-table-row-level-0 > td:nth-child(4)
                                ,.ant-table-row-level-0 > td:nth-child(5)
                                , .ant-table-thead > tr > th:nth-child(1)
                                , .ant-table-thead > tr > th:nth-child(2)
                                , .ant-table-thead > tr > th:nth-child(3)
                                , .ant-table-thead > tr > th:nth-child(4)
                                , .ant-table-thead > tr > th:nth-child(5)
                                {
                                    text-align: center;
                                }
                                .ant-table-thead{
                                    background-color: #e0e5eC;
                                }
                                .ant-table-thead > tr > th{
                                   background: transparent;
                                }
                                .ant-table-thead > tr > th{
                                    padding: 10px 8px;
                                }
                                .ant-table-large {
                                    width: 100%;
                                }
                                .ant-spin-container {
                                    position: relative;
                                    display: flex;
                                    flex-wrap: wrap;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                }
                        `}
                    </style>
                }
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


export default connect(mapStateToPorps, mapDispatchToProps)(StatisticalDeviceData);