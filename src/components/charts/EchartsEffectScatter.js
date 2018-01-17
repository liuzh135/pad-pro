/**
 * Created by SEELE on 2017/8/23.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/china.js');

class EchartsEffectScatter extends Component {
    onChartClick= (params)=>{
        let onEventClick = this.props.onEventClick || {};
        if (typeof onEventClick === 'function' && params.componentType === 'series'){
            onEventClick(params);
        }
    };

    render() {
        const { title, dataSource,subtitle } = this.props;
        const dataOption = {
            backgroundColor: '#A7C2DF',
            title: {
                text: title,
                subtext: subtitle,
                subtextStyle:{
                    color: '#eee'
                },
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    let line = params.value[2];
                    let lineString = line === 0 ? "离线" : "在线";
                    return params.seriesName + '<br/>' + '地址 : ' + params.name + ' ' + lineString;
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                zoom: '1.2',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#E5E9ED',
                        borderColor: '#069fbf'
                    },
                    emphasis: {
                        areaColor: '#D1D1D1'
                    }
                }
            },
            series: dataSource,
        };
        let onEvents = {
            'click': this.onChartClick,
        };
        return (
            <ReactEcharts
                option={dataOption}
                style={{ height: '100%', width: '100%' }}
                className={'react_for_echarts'}
                onEvents={onEvents}
            />
        )
    }
}

export default EchartsEffectScatter;