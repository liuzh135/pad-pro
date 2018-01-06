/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 li数据
 */

import React from "react";
import {Button, Col, DatePicker, Dropdown, Icon, Menu, Radio, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import moment from 'moment';
import BaseEcharView from "../bar/BaseEcharView";
import EcharCom from "../bar/EcharCom";
import EcharBar from "../bar/EcharBar";
import {getDeivceList, getDeviceByDate} from '../../axios';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class StatisticalDeviceData extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            mac: '设备MAC',
            deviceId: 0,
            date: this.getLocDate(),
            first: false,
            devicelist: [],
            pagination: {},
            loading: false,
            echarsData: {},
            airType: 0
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        let first = this.state.first || false;
        if (!first) {
            this.setState({
                first: true
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

    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
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

    /**
     * 获取线表数据
     * @param deviceId  设备ID
     * @param date  日期
     *
     */
    getDeviceDate = (params = {}) => {
        getDeviceByDate(params).then(data => {
            if (data != null) {
                this.setState({
                    echarsData: data
                });
            }
        }).catch(err => {
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

        this.getDeviceDate({
            deviceId: this.state.devicelist[e.key].deviceId,
            date: this.state.date
        });
    };

    //选择日期  重新拉取线表数据
    onSelectChange = (date, dateString) => {
        this.setState({
            date: dateString,
        });
        this.getDeviceDate({
            deviceId: this.state.deviceId,
            date: dateString
        });
    };

    getMenuJon() {
        let menus = [];
        this.state.devicelist.map((data, index) => {
            menus.push(<Menu.Item key={index}>{data.deviceName}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }

    //切换列表
    onTypeChange = (e) => {
        console.log("e =" + e.target.value);
        this.setState({
            airType: e.target.value
        });
    };

    getSelectType = () => {
        let menus = [];
        let echarsData = this.state.echarsData || {};
        echarsData.data && echarsData.data.label && echarsData.data.label.map((airdata, index) => {
            if (index % 3 === 0) {
                menus.push(<RadioButton key={index}
                                        value={index}>{String(airdata).replace("的每个小时平均值", "")}</RadioButton>)
            }
        });
        return <RadioGroup defaultValue={0} onChange={this.onTypeChange}
                           style={{ margin: 5, marginLeft: 10 }}>{menus}</RadioGroup>;
    };

    render() {
        let mac = this.state.mac;
        let deviceId = this.state.deviceId;
        let date = this.state.date;
        console.log("select mac =" + mac + "###deviceId=" + deviceId);
        console.log("select date =" + date);
        let echarsData = this.state.echarsData || {};
        let menu = this.getMenuJon() || '';
        let dateFormat = 'YYYY-MM-DD';

        let echarCom = new EcharCom();
        let datalist = [];
        let xlist = (echarsData && echarsData.data && echarsData.data.axis) || [];
        let airType = this.state.airType;
        if (echarsData && echarsData.data && echarsData.data.series) {
            for (let i = 0; i < 3; i++) {
                let echarList = (echarsData.data.series[airType + i]).data || [];
                let label = echarsData.data.label[airType + i];
                datalist.push(new EcharBar(label, 'line', 'circle', 4, echarList, '#35C9CB', 20));
            }
        }

        let title = (echarsData && echarsData.data && echarsData.data.title) || "设备历史数据";
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" :
            <BaseEcharView title={title} option={echarCom.option} xAxis={xlist} data={datalist}
                           style={{ height: '310px', width: '100%', border: '#E9E9E9 solid 1px' }}/>;
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
                                <div>
                                    {this.getSelectType()}
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Button style={{ margin: 10 }}>
                                            {mac} <Icon type="down"/>
                                        </Button>
                                    </Dropdown>

                                    <DatePicker style={{ margin: 10, marginLeft: 10 }}
                                                onChange={this.onSelectChange}
                                                defaultValue={moment(date, dateFormat)}
                                                format={dateFormat}/>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={24} style={{ paddingRight: '30px' }}>
                        <div className="gutter-box" style={{ padding: '2px 15px' }}>
                            {ecahrs}
                        </div>
                    </Col>
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