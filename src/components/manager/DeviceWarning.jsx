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

class DeviceWarning extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
        pm1.push(this.createPm1(0, 0, 50, 0, 50, 0, 50, "#55C300", "优"));
        pm1.push(this.createPm1(1, 50, 100, 50, 100, 50, 100, "#F3CB00", "良"));
        pm1.push(this.createPm1(2, 100, 150, 100, 150, 100, 150, "#FF9200", "轻度"));
        pm1.push(this.createPm1(3, 150, 200, 150, 200, 150, 200, "#FF2C1A", "中度"));
        pm1.push(this.createPm1(4, 200, 300, 200, 300, 200, 300, "#ED2FA6", "重度"));
        return pm1;
    };

    getTempWarningData = () => {
        let pm1 = [];
        pm1.push(this.createPm2(0, 50, 0, 50, "#5fbec3", "上限"));
        pm1.push(this.createPm2(0, 0, 0, 50, "#55C300", "下限"));
        pm1.push(this.createPm1(0, 0, 50, 0, 50, 0, 50, "#55C300", "正常"));
        return pm1;
    };


    createDomCards = () => {
        const menu = ["ppm", "bbm"];
        const menu1 = ["μg/m3"];
        const tempUnit = ["℃"];
        const siUnit = ["%"];
        let cards = [];
        cards.push(<PM1WarningCards title="pm1空气指数" key={0} menu={menu} warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards title="PM2.5空气指数" key={1} menu={menu} warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards title="PM10空气指数" key={2} menu={menu} warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards title="TVOG空气指数" key={3} menu={menu} isRight={true}
                                    warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards title="HCHO空气指数" key={4} menu={menu1} warnData={this.getAirWarningData()}/>);
        cards.push(<PM1WarningCards title="ECO2空气指数" key={5} menu={menu1} warnData={this.getAirWarningData()}/>);

        cards.push(<TempWarningCards title="TEMP参数范围" key={6} menu={tempUnit}
                                     warnData={this.getTempWarningData()}/>);
        cards.push(<TempWarningCards title="湿度参数范围" key={7} menu={siUnit} isRight={true}
                                     warnData={this.getTempWarningData()}/>);
        this.setState({
            cards: cards
        });
    };

    render() {
        //设备预警的卡片--空气
        let airCards = this.state.cards || [];
        return (
            <Layout style={{ backgroundColor: "#fff" }}>
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