/**
 * @fileName: StatisticalAirData.jsx
 * Created on 2017-12-20
 * 空气趋势 统计数据
 */

import React from "react";
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import Bacecomstyle from "../Bacecomstyle";
import SelectCityAndDevice from "../device/SelectCityAndDevice";
import {AirEchars} from "./AirEchars";
import {getDeviceByCityAndDate, getDeviceByCityAndMonth} from "../../axios";
import EcharBar from "../bar/EcharBar";
import {OnlineDeviceInfo} from "./OnlineDeviceInfo";
import {BaseComponent} from "../BaseComponent";
import {FormattedMessage, injectIntl} from "react-intl";

class StatisticalAirData extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            addr: {},
            echarsHourData: [],
            echarsMonthData: []
        }
    }

    selectCity = (addr) => {
        this.setBaseState({
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
                    this.setBaseState({
                        echarsHourData: data
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setBaseState({
                echarsHourData: []
            });
        }
    };

    getDeviceByCityAndMonth = (cityName, date) => {
        if (cityName !== undefined && cityName != null && cityName !== "") {
            getDeviceByCityAndMonth(cityName, date).then((data) => {
                if (data.data != null) {
                    this.setBaseState({
                        echarsMonthData: data
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setBaseState({
                echarsMonthData: []
            });
        }
    };
    isShowLine = (data) => {
        if ((data.indexOf("PM1") !== -1) || (data.indexOf("PM10") !== -1) || (data.indexOf("PM2_5") !== -1)) {
            return true;
        }
        return false;
    };

    isCantin = (data, tardata) => {
        if ((data === tardata)) {
            return true;
        }
        return false;
    };

    getChars = (echarsHourData, shape) => {
        let dataList = [];
        let shapeView = shape || 'line';
        let xlist = (echarsHourData && echarsHourData.data && echarsHourData.data.axis) || [];
        if (echarsHourData && echarsHourData.data && echarsHourData.data.series) {
            for (let i = 0; i < echarsHourData.data.series.length; i++) {
                if (i % 3 === 0) {
                    if (this.isShowLine(echarsHourData.data.label[i])) {
                        let echarList = (echarsHourData.data.series[i]).data || [];
                        let label = echarsHourData.data.label[i];
                        let reg = /[\u4E00-\u9FA5]/g;
                        let labelString = String(label).replace(reg, "");
                        let color = this.isCantin(labelString, "PM1") ? '#60B4EF' : this.isCantin(labelString, "PM2_5") ? "#B9A6DF" : "#34C8CA";

                        dataList.push(new EcharBar(labelString, shapeView, 'circle', 4, echarList, color, 20));
                    }

                }
            }
        }
        return { xlist, dataList };
    };

    render() {

        let hourData = this.getChars(this.state.echarsHourData);
        let monthData = this.getChars(this.state.echarsMonthData, "line");

        let addr = this.state.addr;

        let language = this.props.language;
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}><FormattedMessage id="airTrend"/></span>
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
                    <AirEchars mainTitle="air_quality_trend" title={addr.cityName + (language.data === "zhLanguage"? "24小时空气质量":"24 hour air quality")}
                               xlist={hourData.xlist}
                               datalist={hourData.dataList}/>
                    <AirEchars mainTitle="month_quality_air" title={addr.cityName + (language.data === "zhLanguage"? "月空气质量":"Monthly air quality")}
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
    const { auth ,language = 'zhLanguage'} = state.httpData;
    return { auth ,language};
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(injectIntl(StatisticalAirData));