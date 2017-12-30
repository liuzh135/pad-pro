/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 li数据
 */

import React from "react";
import {Button, Col, Dropdown, Menu, message, Row, Icon, Radio} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import BaseTableData from "../data/BaseTableData";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {DatePicker} from 'antd';
import moment from 'moment';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;

class StatisticalDeviceData extends React.Component {

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
            queryParam: {
                'activityId': 1,//活动ID
                'statisDate': d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate(),//查询日期默认当天
                'userType': 1,//
            }
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


    getMenuJon() {
        let menus = [];
        this.state.menuJson.map(function (data) {
            menus.push(<Menu.Item key={data.key}>{data.value}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }

    render() {
        let tableComs = new BaseTableData();
        let mac = this.state.mac;
        let menu = this.getMenuJon() || '';
        let dateFormat = 'YYYY/MM/DD';
        let monthFormat = 'YYYY/MM';
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px', borderBottom: '#E9E9E9 solid 1px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备历史数据</span>
                                </div>

                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button style={{ margin: 10 }}>
                                        {mac} <Icon type="down"/>
                                    </Button>
                                </Dropdown>

                                <div>
                                    <div className='pull-left'>
                                        <RadioGroup defaultValue="a" style={{ margin: 5, marginLeft: 10 }}>
                                            <RadioButton value="a">今天</RadioButton>
                                            <RadioButton value="b">7天</RadioButton>
                                            <RadioButton value="c">14天</RadioButton>
                                            <RadioButton value="d">30天</RadioButton>
                                        </RadioGroup>
                                    </div>
                                    <div className='pull-left'>
                                        <RangePicker style={{ margin: 5, marginLeft: 10 }}
                                                     defaultValue={[moment('2015/01/01', dateFormat), moment('2017/01/01', dateFormat)]}
                                                     format={dateFormat}/>
                                    </div>
                                </div>
                                <ExtBaseicTable {...tableComs.deviceTabledata} />
                            </div>
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