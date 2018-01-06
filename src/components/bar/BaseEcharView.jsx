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
        const { style, option, data, xAxis, legend, title } = this.props;

        const dataOption = Object.assign(option, {
            series: data,
            title: {
                text: title,
                left: '50%',
                show: true,
                textAlign: 'center'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: legend,
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