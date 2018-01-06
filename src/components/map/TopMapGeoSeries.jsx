/**
 * @fileName: BaseMapGeoSeries.jsx
 * Created on 2018-01-06
 *
 * 地图基础数据
 */
import BaseMapGeoSeries from "./BaseMapGeoSeries";

class TopMapGeoSeries extends BaseMapGeoSeries {
    constructor(name, type,data) {
        super(name, type,data);
        this.name = name || 'pm2.5';
        this.type = type || 'effectScatter';
        this.showEffectOn = 'render';
        this.rippleEffect = {
            brushType: 'stroke'
        };
        this.data = data;
        this.hoverAnimation = true;
        this.label = {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        };
        this.itemStyle = {
            normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        };
        this.zlevel = 1
    }
}

export default TopMapGeoSeries;