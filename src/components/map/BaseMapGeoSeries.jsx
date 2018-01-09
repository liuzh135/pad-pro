/**
 * @fileName: BaseMapGeoSeries.jsx
 * Created on 2018-01-06
 *
 * 地图基础数据
 */
class BaseMapGeoSeries {
    constructor(name, type, data) {
        this.name = name || '';
        this.type = type || 'scatter';
        this.coordinateSystem = 'geo';
        this.data = data;
        this.symbolSize = function (val) {
            return val === 0 ? 10 : 15;
        };
        this.label = {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: true
            }
        };
        this.itemStyle = {
            normal: {
                color: '#ddb926'
            }
        };
    }
}

export default BaseMapGeoSeries;