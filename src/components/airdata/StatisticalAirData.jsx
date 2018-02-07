/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 统计数据
 */

import React from "react";
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import BaseTableData from "../data/BaseTableData";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import Bacecomstyle from "../Bacecomstyle";
import SelectCityAndDevice from "../device/SelectCityAndDevice";
import {AirEchars} from "./AirEchars";
import {getDeviceByCityAndDate, getDeviceByCityAndMonth} from "../../axios";
import EcharBar from "../bar/EcharBar";
import {OnlineDeviceInfo} from "./OnlineDeviceInfo";

class StatisticalAirData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addr: {},
            echarsHourData: [],
            echarsMonthData: []
        }
    }

    componentDidMount() {
    }

    //获取网络数据 渲染UI
    componentWillReceiveProps(nextProps) {

    }


    selectCity = (addr) => {
        console.log("addr ====>" + JSON.stringify(addr));
        this.setState({
            addr: addr
        });
        this.getHourData(addr.cityName, this.getLocDate());
        this.getDeviceByCityAndMonth(addr.cityName, this.getLocDate());
    };

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

    getHourData = (cityName, date) => {
        if (cityName !== undefined && cityName != null && cityName !== "") {
            getDeviceByCityAndDate(cityName, date).then((data) => {
                if (data.data != null) {
                    this.setState({
                        echarsHourData: data
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                echarsHourData: []
            });
        }
    };

    getDeviceByCityAndMonth = (cityName, date) => {
        if (cityName !== undefined && cityName != null && cityName !== "") {
            getDeviceByCityAndMonth(cityName, date).then((data) => {
                if (data.data != null) {
                    this.setState({
                        echarsMonthData: data
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                echarsMonthData: []
            });
        }
    };

    getChars = (echarsHourData, shape) => {
        let dataList = [];
        let shapeView = shape || 'line';
        let xlist = (echarsHourData && echarsHourData.data && echarsHourData.data.axis) || [];
        if (echarsHourData && echarsHourData.data && echarsHourData.data.series) {
            for (let i = 0; i < echarsHourData.data.series.length; i++) {
                if (i % 3 === 0) {
                    let echarList = (echarsHourData.data.series[i]).data || [];
                    let label = echarsHourData.data.label[i];
                    let reg = /[\u4E00-\u9FA5]/g;
                    let labelString = String(label).replace(reg, "");
                    let color = ((i / 3) % 3) === 0 ? '#60B4EF' : ((i / 3) % 3) === 1 ? "#B9A6DF" : "#34C8CA";

                    dataList.push(new EcharBar(labelString, shapeView, 'circle', 4, echarList, color, 20));
                }
            }
        }
        return { xlist, dataList };
    };

    render() {

        let hourData = this.getChars(this.state.echarsHourData);
        let monthData = this.getChars(this.state.echarsMonthData, "line");

        let addr = this.state.addr;
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px'}}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>空气趋势城市数据</span>
                                </div>
                                <div style={{ border: '1px solid #C7D3E3', padding: '10px 10px' }}>
                                    <SelectCityAndDevice
                                        selectCity={this.selectCity}/>
                                </div>

                                <div className="city-table"
                                     style={{
                                         border: '1px solid #C7D3E3',
                                         borderTop: '0px',
                                         padding: '2px 15px 15px'
                                     }}>
                                    <OnlineDeviceInfo addr={addr}/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <AirEchars mainTitle="空气质量趋势" title={addr.provinceName + addr.cityName + "24小时空气质量"}
                               xlist={hourData.xlist}
                               datalist={hourData.dataList}/>
                    <AirEchars mainTitle="月空气质量" title={addr.provinceName + addr.cityName + "月空气质量"}
                               xlist={monthData.xlist}
                               datalist={monthData.dataList}/>
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