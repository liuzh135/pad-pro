/**
 * @fileName: BaiduMapView.jsx
 * Created on 2018-01-18
 * 显示百度地图层
 *
 */

import React from "react";
import {Icon} from "antd";
import {Map, NavigationControl} from "react-bmap";

export class BaiduMapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    closeMap = ()=>{
        let closeMap = this.props.closeMap;
        if (closeMap != null && typeof closeMap === "function"){
            closeMap();
        }
    };

    render() {

        const { cityName, showMap } = this.props;
        let mapView = <div className="map_view">
            <Icon type="close" onClick={this.closeMap} style={{ margin: '3px', color: '#0fb0f0' }}/>
            <Map center={cityName} zoom="16">
                <NavigationControl/>
            </Map>
        </div>;
        return showMap ? mapView : <div></div>;
    }
}