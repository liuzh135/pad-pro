/**
 * @fileName: EcharBar.jsx
 * Created on 2017-11-23
 *
 * 折线图数据类型
 * @name 线条名字
 * @type 线条类型  line  折线
 * @symbol 点击折线显示的形状  circle 圆形
 * @symbolSize 点击折线显示的形状大小
 * @color 线条颜色
 * @barWidth 线条粗细
 *
 */

import EcharsLine from './EcharsLine'
import echarts from 'echarts'

class EcharBar extends EcharsLine {
    constructor(name, type, symbol, symbolSize, data, color, barWidth) {
        super(name, type, symbol, symbolSize, data, color);
        this.barWidth = barWidth || 8;
        this.markLine = {}
        this.precision = 1;
            this.label = {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#188df0'

                    },
                    position: 'top'
                },
            };
        this.itemStyle = {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ]
                ),
                barBorderRadius: 0,
            }
        };
    }
}

export default EcharBar;