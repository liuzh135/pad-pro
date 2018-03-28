/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 设备告警
 */

import React from "react";
import {Layout, Menu} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {PM1WarningCards} from "./PM1WarningCards";
import {TempWarningCards} from "./TempWarningCards";
import {FormattedMessage} from "react-intl";

class DeviceWarning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            color: 0,
            cards: [],
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {

    }

    componentDidMount() {
        //加载的时候调用一次预警列表
        this.createDomCards();
    }

    //组装数据
    createPm1 = (index, startValue, endValue, startmin, startmax, endmin, endmax, colorValue, title) => {
        return {
            keyindex: index,
            startValue: startValue,
            endValue: endValue,
            startmin: startmin,
            startmax: startmax,
            endmin: endmin,
            endmax: endmax,
            colorValue: colorValue,
            title: title
        }
    };

    //组装数据
    createPm2 = (index, startValue, startmin, startmax, colorValue, title) => {
        return {
            keyindex: index,
            startValue: startValue,
            startmin: startmin,
            startmax: startmax,
            colorValue: colorValue,
            title: title
        }
    };

    getAirWarningData = () => {
        let pm1 = [];
        pm1.push(this.createPm1(0, 0, 50, 0, 50, 0, 50, "#55C300", <FormattedMessage id="level_excellent"/>));
        pm1.push(this.createPm1(1, 50, 100, 50, 100, 50, 100, "#F3CB00", <FormattedMessage id="level_good"/>));
        pm1.push(this.createPm1(2, 100, 150, 100, 150, 100, 150, "#FF9200", <FormattedMessage id="level_light"/>));
        pm1.push(this.createPm1(3, 150, 200, 150, 200, 150, 200, "#FF2C1A", <FormattedMessage id="level_moderate"/>));
        pm1.push(this.createPm1(4, 200, 300, 200, 300, 200, 300, "#ED2FA6", <FormattedMessage id="level_severe"/>));
        return pm1;
    };

    getTempWarningData = () => {
        let pm1 = [];
        pm1.push(this.createPm2(0, 50, 0, 50, "#5fbec3", <FormattedMessage id="upper_limit"/>));
        pm1.push(this.createPm2(0, 0, 0, 50, "#55C300", <FormattedMessage id="lower_limit"/>));
        pm1.push(this.createPm1(0, 0, 50, 0, 50, 0, 50, "#55C300", <FormattedMessage id="normal"/>));
        return pm1;
    };


    createDomCards = () => {
        const menu = ["ppm", "μg/m³", "ppb"];
        const menu1 = ["μg/m3"];
        const tempUnit = ["℃"];
        const siUnit = ["%"];
        let cards = [];
        let color = this.state.color + 1;
        cards.push(<PM1WarningCards showColor={color} title={<span>PM1 <FormattedMessage id="air_index"/></span>}
                                    key={0}
                                    menu={menu}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards showColor={color} title={<span>PM2.5 <FormattedMessage id="air_index"/></span>}
                                    key={1}
                                    menu={menu}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards showColor={color} title={<span>PM10 <FormattedMessage id="air_index"/></span>}
                                    key={2}
                                    menu={menu}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards showColor={color} title={<span>TVOG <FormattedMessage id="air_index"/></span>}
                                    key={3}
                                    menu={menu} isRight={true}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards showColor={color} title={<span>HCHO <FormattedMessage id="air_index"/></span>}
                                    key={4}
                                    menu={menu1}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards showColor={color} title={<span>ECO2 <FormattedMessage id="air_index"/></span>}
                                    key={5}
                                    menu={menu1}
                                    warnData={this.getAirWarningData()}/>);

        cards.push(<TempWarningCards showColor={color}
                                     title={<span>TEMP <FormattedMessage id="parameter_range"/></span>}
                                     key={6} menu={tempUnit}
                                     warnData={this.getTempWarningData()}/>);
        cards.push(<TempWarningCards showColor={color} title={<span><FormattedMessage id="humidity"/> <FormattedMessage
            id="parameter_range"/></span>} key={7} menu={siUnit} isRight={true}
                                     warnData={this.getTempWarningData()}/>);
        this.setState({
            cards: cards,
            color: color
        });
    };

    onWindowClick = () => {
        //把所有的颜色选择框都去掉
        this.createDomCards();
    };

    render() {
        //设备预警的卡片--空气
        let airCards = this.state.cards || [];
        return (
            <Layout style={{ backgroundColor: "#fff" }} onClick={this.onWindowClick}>
                <div className="text-title">
                    <span style={{ marginLeft: "15px" }}><FormattedMessage id="device_warning"/></span>
                </div>
                <section className="flex flex-gongge">
                    {airCards}
                </section>
            </Layout>
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

export default connect(mapStateToPorps, mapDispatchToProps)(DeviceWarning);