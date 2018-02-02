/**
 * @fileName: InputSelectPm.jsx
 * Created on 2018-02-01
 * 显示设备实时数据模块 --- 模拟设备端数据
 */
import React from "react";
import ReactEcharts from 'echarts-for-react';


export class DynamicEcharView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
        };
        this.now = +new Date(1997, 9, 3);
        this.oneDay = 24 * 3600 * 1000;
        this.value = Math.random() * 1000;
    }

    componentDidMount() {
        let data = this.state.data || [];
        setInterval(() => {

            for (let i = 0; i < 5; i++) {
                data.shift();
                data.push(this.randomData(this.now, this.oneDay, this.value));
            }

            this.setState({
                data: data
            });
        }, 1000);
    }

    randomData = (now, oneDay, value) => {
        let now1 = new Date(+now + oneDay);
        this.now = now1;
        let value1 = value + Math.random() * 21 - 10;
        this.value = value1;
        return {
            name: now1.toString(),
            value: [
                [now1.getFullYear(), now1.getMonth() + 1, now1.getDate()].join('/'),
                Math.round(value1)
            ]
        }
    };

    getData = () => {
        let data = [];
        for (let i = 0; i < 1000; i++) {
            data.push(this.randomData(this.now, this.oneDay, this.value));
        }

        return data;
    };

    render() {
        let data = this.state.data || [];

        const option = {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    let date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            }, grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        };

        return (<div className="gutter-box" style={{ padding: '2px 15px' }}>
            <ReactEcharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                className={'react_for_echarts'}
            />
        </div>);
    }
}