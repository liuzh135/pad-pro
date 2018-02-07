/**
 * @fileName: ExtBaseicTable.jsx
 * Created on 2017-11-23
 *
 * 折线图
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';

class BaseEcharView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { style, option, data, xAxis, legend, title, subtitle } = this.props;

        const dataOption = Object.assign(option, {
            series: data,
            title: {
                text: title || "",
                subtext: subtitle || "",
                left: '1%',
                show: true,
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#41A8DA'
                },
                subtextStyle: {
                    fontSize: 12,
                    color: '#aaa'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                show: true,
                data: legend
            },

            xAxis: {
                type: 'category',
                data: xAxis,
                boundaryGap: true,
                splitLine: {
                    show: false,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#D4DFF5']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#609ee9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 10
                    }
                }
            }
        });
        // console.log("option = " + JSON.stringify(dataOption));

        return (
            <ReactEcharts
                option={dataOption}
                style={style}
                notMerge={true}
                lazyUpdate={true}
                className={'react_for_echarts'}
            />
        )
    }
}

export default BaseEcharView;