/**
 * @fileName: EcharCom.jsx
 * Created on 2017-11-23
 *
 * 折线图的样式
 *
 */
class EcharCom {
    tooltip = {
        trigger: 'axis',
        gridIndex:2,
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
            color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    };

    yAxis = {
        type: 'value',
        splitLine: {
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
            textStyle: {
                fontSize: 8,
            }
        }
    };

    option = {
        tooltip: this.tooltip,
        yAxis: this.yAxis
    };
}

export default EcharCom