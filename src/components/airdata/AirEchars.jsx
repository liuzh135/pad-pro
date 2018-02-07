/**
 * @fileName: AirEchars.jsx
 * Created on 2018-02-01
 * 空气趋势表
 */
import React from "react";

import {Alert, Button, Col, InputNumber} from 'antd';
import BaseTableData from "../data/BaseTableData";
import EcharCom from "../bar/EcharCom";
import BaseEcharView from "../bar/BaseEcharView";


export class AirEchars extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            first: false,
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


    render() {
        //刷新2次  解决echars 的宽度问题
        let first = this.state.first || false;
        let echarCom = new EcharCom();

        const { datalist, xlist, title, mainTitle } = this.props;
        let ecahrs = !first ? "" :
            <BaseEcharView title={title} option={echarCom.option} xAxis={xlist} data={datalist}
                           style={{ height: '310px', marginLeft: '5px', border: '#C7D3E3 solid 1px' }}/>;

        return (<Col className="gutter-row" md={24} style={{ paddingRight: '30px' }}>
            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                <div className="text-title" style={{ paddingTop: '2px' }}>
                    <span style={{ marginLeft: "15px" }}>{mainTitle}</span>
                </div>
                {ecahrs}
            </div>
        </Col>);
    }
}