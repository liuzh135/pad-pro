/**
 * @fileName: BarStyleProgress.jsx
 * Created on 2017-12-22
 * TVOG HCHO ECO2  详情展示页面
 */
import React from "react";
import {Progress} from 'antd';

export default class BarStyleProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getProString(percent){
        console.log("11111111 percent :" + percent)
        return (percent);
    }
    render() {
        const { airName, prosName1, prosgress1, prosName2, prosgress2 } = this.props;
        return (
            <div className=" pd-2x">
                <div><span style={{ fontSize: '20px', margin: '5px' }}>{airName}</span></div>
                <div><span style={{ margin: '5px' }}>{prosName1}</span></div>
                <Progress style={{ margin: '5px' }} percent={prosgress1} status="active" format={this.getProString}/>
                <div><span style={{ margin: '5px' }}>{prosName2}</span></div>
                <Progress style={{ margin: '5px' }} percent={prosgress2} status="active" format={this.getProString}/>
            </div>
        );
    }

}