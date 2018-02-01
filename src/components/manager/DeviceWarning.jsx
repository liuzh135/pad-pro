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

    createDomCards = () => {
        const menu = ["ppm","bbm","ddm"];
        let cards = [];
        cards.push(<PM1WarningCards title="pm1空气指数" key={1} menu={menu}/>);
        this.setState({
            cards: cards
        });
    };

    render() {
        //设备预警的卡片
        let cards = this.state.cards || [];
        return (
            <Layout style={{ backgroundColor: "#fff" }}>
                <section className="flex flex-gongge">
                    {cards}
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