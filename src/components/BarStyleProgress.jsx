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

    getProString = (percent) => {
        return (percent) * 10;
    };

    getSafeProgress = (percent) => {
        if (percent > 100) return 100;
        return percent;
    };

    render() {
        const { className, airName, prosName1, prosgress1, prosName2, prosgress2 } = this.props;
        return (
            <div className={" pd-2x" + " " + className}>
                <div><span style={{ fontSize: '20px', margin: '5px' }}>{airName}</span></div>
                <div><span style={{ margin: '5px' }}>{prosName1}</span></div>
                <Progress style={{ margin: '5px' }} percent={this.getSafeProgress(parseInt(prosgress1) / 10)}
                          status="active"
                          format={this.getProString}/>
                <div><span style={{ margin: '5px' }}>{prosName2}</span></div>
                <Progress style={{ margin: '5px' }} percent={this.getSafeProgress(parseInt(prosgress2) / 10)}
                          status="active"
                          format={this.getProString}/>
                {
                    <style>
                        {`
                            .ant-progress-inner{
                                background-color: rgba(247, 247, 247, 0.27)
                            }
                            .ant-progress-bg{
                                background-color: #FFFFFF;
                            }
                            .ant-progress-status-active .ant-progress-bg:before{
                                background: #2789F6
                            }
                        `}
                    </style>
                }
            </div>
        );
    }

}