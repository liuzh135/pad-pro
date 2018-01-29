/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 统计数据
 */

import React from "react";
import {Col, Icon, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import BaseTableData from "../data/BaseTableData";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import Bacecomstyle from "../Bacecomstyle";
import BaseEcharView from "../bar/BaseEcharView";
import EcharCom from "../bar/EcharCom";
import EcharBar from "../bar/EcharBar";
import Dropdown from "antd/es/dropdown/dropdown";
import Button from "antd/es/button/button";

class StatisticalAirData extends React.Component {

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
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        const { receiveData } = this.props;
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
        let tableComs = new BaseTableData();
        let echarCom = new EcharCom();
        let echarCom1 = new EcharCom();
        let menu={};
        let mac={};
        let datalist = [];
        let datalist1 = [];
        let xlist = ["1点", "2点", "3点", "4点", "5点", "6点", "7点", "8点", "9点", "10点",];

        datalist.push(new EcharBar('PM2.5', 'line', 'circle', 4, [120, 300, 402, 180, 590, 620, 200, 190, 220, 500], '#35C9CB', 20));
        datalist1.push(new EcharBar('PM2.5', 'bar', 'circle', 4, [100, 100, 202, 180, 590, 520, 300, 290, 220, 500], '#35C9CB', 20));

        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" :
            <BaseEcharView title="深圳过去24小时空气质量指数趋势" option={echarCom.option} xAxis={xlist} data={datalist}
                           style={{ height: '310px', width: '100%', border: '#E9E9E9 solid 1px' }}/>;

        let ecahrs1 = !first ? "" :
            <BaseEcharView title="深圳过去21天空气质量指数趋势" option={echarCom1.option} xAxis={xlist} data={datalist1}
                           style={{ height: '310px', width: '100%', border: '#E9E9E9 solid 1px' }}/>;
        return (
            <div className="gutter-example button-demo" style={{  backgroundColor:'#fff'}}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px', borderBottom: '#E9E9E9 solid 1px' ,height:"400px"}}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>采集点实时数据</span>
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
                                <ExtBaseicTable {...tableComs.pmTabledata} />
                            </div>

                        </div>
                    </Col>
                    <Col className="gutter-row" md={24} style={{ paddingRight: '30px' }}>
                        <div className="gutter-box" style={{ padding: '2px 15px' }}>
                            <div className="text-title" style={{ paddingTop: '2px' }}>
                                <span style={{ marginLeft: "15px" }}>空气质量趋势</span>
                            </div>
                            {ecahrs}
                        </div>
                    </Col>
                    <Col className="gutter-row" md={24} style={{ paddingRight: '30px' }}>
                        <div className="gutter-box" style={{ padding: '2px 15px' }}>
                            <div className="text-title" style={{ paddingTop: '2px' }}>
                                <span style={{ marginLeft: "15px" }}>月空气质量</span>
                            </div>
                            {ecahrs1}
                        </div>
                    </Col>
                </Row>
                {
                    Bacecomstyle
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


export default connect(mapStateToPorps, mapDispatchToProps)(StatisticalAirData);