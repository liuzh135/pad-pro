/**
 * @fileName: HistoryEcharView.jsx
 * Created on 2018-01-08
 * 历史数据 控件查询
 * props deviceId 设备ID
 * props type 查询类型 （1:按小时每分钟 2:按天每小时查看 3:按月每天查看）
 */

import React from "react";
import {TimePicker, Col, DatePicker, Radio} from 'antd';
import moment from 'moment';
import BaseEcharView from "../bar/BaseEcharView";
import EcharCom from "../bar/EcharCom";
import EcharBar from "../bar/EcharBar";
import {getDeviceByDate, getDeviceByHour} from '../../axios';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export default class HistoryEcharView extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            date: this.getLocDate(),
            time: this.getLocTimeHour(),
            timeString: d.getHours(),
            first: false,
            echarsData: {},
            airType: 0,
            open: false
        }
    }

    componentDidMount() {
        let first = this.state.first || false;
        if (!first) {
            this.setState({
                first: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("this deivceId" + this.props.deviceId);
        console.log("nextProps deivceId" + nextProps.deviceId);
        if (nextProps.deviceId !== null) {
            let type = this.props.type || 1;
            if (type === 1) {
                this.getDeviceHour({
                    deviceId: nextProps.deviceId,
                    date: this.state.time
                });
            } else {
                this.getDeviceDate({
                    deviceId: nextProps.deviceId,
                    date: this.state.date
                });
            }
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

    getLocTimeHour = () => {
        let date = new Date();
        let hour = date.getHours();       //获取当前小时数(0-23)
        let dateTime = this.getLocDate();
        return dateTime + " " + hour + ":00:00";
    };

    /**
     * 获取线表数据
     * @param deviceId  设备ID
     * @param date  日期 2018-1-5
     *
     */
    getDeviceDate = (params = {}) => {
        getDeviceByDate(params).then(data => {
            if (data != null && data.data != null) {
                this.setState({
                    echarsData: data
                });
            }
        }).catch(err => {
            console.log(err)
        });
    };

    /**
     * 获取线表数据
     * @param deviceId  设备ID
     * @param date  日期 2018-1-5 12:00:00
     *
     */
    getDeviceHour = (params = {}) => {
        getDeviceByHour(params).then(data => {
            if (data != null && data.data != null) {
                this.setState({
                    echarsData: data
                });
            }
        }).catch(err => {
            console.log(err)
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

    //选择日期  重新拉取线表数据
    onSelectChange = (date, dateString) => {
        this.setState({
            date: dateString,
        });
        let deviceId = this.props.deviceId;


        let type = this.props.type || 1;
        if (type === 1) {
            this.setState({ open: true });
        } else {
            deviceId && this.getDeviceDate({
                deviceId: deviceId,
                date: dateString
            });
        }
    };

    getDataAndTime = (timeString) => {
        let date = this.state.date;
        return date + " " + timeString + ":00:00";
    };

    onSelectTimeChange = (timeData, timeString) => {
        this.setState({
            time: this.getDataAndTime(timeString),
            open: false,
        });
        let deviceId = this.props.deviceId;

        deviceId && this.getDeviceHour({
            deviceId: deviceId,
            date: this.getDataAndTime(timeString)
        });


    };

    //切换列表
    onTypeChange = (e) => {
        console.log("e =" + e.target.value);
        this.setState({
            airType: e.target.value
        });
    };

    handleOpenChange = (open) => {
        this.setState({ open });
    };

    render() {
        let type = this.props.type || 1;
        let date = this.state.date;
        let timeString = this.state.timeString;
        let dateFormat = 'YYYY-MM-DD';
        let timeFormat = 'HH';
        let echarsData = this.state.echarsData || {};

        let echarCom = new EcharCom();
        let datalist = [];
        let xlist = (echarsData && echarsData.data && echarsData.data.axis) || [];
        let airType = this.state.airType;
        let legend = [];
        if (echarsData && echarsData.data && echarsData.data.series) {
            for (let i = 0; i < 3; i++) {
                let echarList = (echarsData.data.series[airType + i]).data || [];
                let label = echarsData.data.label[airType + i];
                legend.push(label);
                let color = i === 0 ? '#60B4EF' : i === 1 ? "#B9A6DF" : "#34C8CA";

                datalist.push(new EcharBar(label, 'line', 'circle', 4, echarList, color, 20));
            }
        }

        let title = (echarsData && echarsData.data && echarsData.data.title) || "设备历史数据";

        let subtitle = type === 1 ? "按小时查看" : type === 2 ? "按天每小时查看" : "按月每天查看";
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let ecahrs = !first ? "" :
            <BaseEcharView legend={legend} subtitle={subtitle} title={title} option={echarCom.option} xAxis={xlist}
                           data={datalist}
                           style={{ height: '310px', width: '100%', border: '#E9E9E9 solid 1px' }}/>;
        let timePicker = type === 1 ? <TimePicker
            open={this.state.open}
            onOpenChange={this.handleOpenChange}
            defaultValue={moment(timeString, timeFormat)}
            onChange={this.onSelectTimeChange}
            format={timeFormat}/> : "";

        return (<Col className="gutter-row" md={24} style={{ paddingRight: '30px' }}>
            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                <div className='flex-space-between device_name_div'>
                    <div>
                        <DatePicker style={{ margin: 10, marginLeft: 10 }}
                                    onChange={this.onSelectChange}
                                    defaultValue={moment(date, dateFormat)}
                                    format={dateFormat}/>
                        {timePicker}
                    </div>

                    {this.getSelectType()}
                </div>
                {ecahrs}
            </div>
        </Col>);
    }
}