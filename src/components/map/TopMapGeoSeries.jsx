/**
 * @fileName: BaseMapGeoSeries.jsx
 * Created on 2018-01-06
 *
 * 地图基础数据
 */
import BaseMapGeoSeries from "./BaseMapGeoSeries";

class TopMapGeoSeries extends BaseMapGeoSeries {
    constructor(name, type, data, pointColor) {
        super(name, type, data);
        this.bgColor = ["#55C300", "#F3CB00", "#FF9200", "#FF2C1A", "#ED2FA6", "#C3271E"];
        this.name = name || '';
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
                color: (seriesIndex, series, dataIndex, data) => {
                    // console.log("---seriesIndex->" + JSON.stringify(seriesIndex.data));
                    if (seriesIndex != null && seriesIndex.data != null) {
                        let pm25 = seriesIndex.data.value[5];
                        return this.getPmLevel(pm25);
                    }
                },
                shadowBlur: 10,
                shadowColor: '#9eaf97'
            }
        };
        this.zlevel = 1
    }

    getPmLevel = (pm) => {
        let pmValue = 0;
        if (pm >= 0 && pm <= 50) {
            pmValue = this.bgColor[0];
        } else if (pm > 50 && pm <= 100) {
            pmValue = this.bgColor[1];
        } else if (pm > 100 && pm <= 150) {
            pmValue = this.bgColor[2];
        } else if (pm > 150 && pm <= 200) {
            pmValue = this.bgColor[3];
        } else if (pm > 200 && pm <= 300) {
            pmValue = this.bgColor[4];
        } else if (pm > 300) {
            pmValue = this.bgColor[5];
        }
        // console.log("--pm->" + pm);
        // console.log("--pmValue->" + pmValue);
        return pmValue
    };
}

export default TopMapGeoSeries;