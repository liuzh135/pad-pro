/**
 * @fileName: InputSelectPm.jsx
 * Created on 2018-02-01
 * 显示设备实时数据模块 --- 模拟设备端数据
 */
import React from "react";
import {Col, Row} from "antd";
import {ProgressStyle} from "../ProgressStyle";
import {AirDataProgress} from "../AirDataProgress";
import BarStyleProgress from "../BarStyleProgress";


export class VirtualMachineView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { dataSource } = this.props;
        let temp = dataSource.temp;
        let rh = dataSource.rh;
        let pm25 = dataSource.pm25;
        let pm10 = dataSource.pm10;
        let pm1 = dataSource.pm1;
        let eco2 = dataSource.eco2;
        let eco2_mg = dataSource.eco2_mg;
        let hcho = dataSource.hcho;
        let hcho_ug = dataSource.hcho_ug;
        let tvoc = dataSource.tvoc;
        let tvoc_ug = dataSource.tvoc_ug;

        return (<Row gutter={10} className="text-center" style={{
            margin: '10px 40px 20px',
            paddingLeft: '50px',
            paddingRight: '50px',
            background: 'linear-gradient(to right bottom, #9326B7, #4C1DA6 80%, #3322A8)'
        }}>
            <Col className="gutter-row " md={6}
                 style={{ padding: '20px' }}>
                <ProgressStyle className='progress_index' width={200} height={250}
                               progress={(parseInt(temp) / 10000)}
                               proressValue={"RH: " + (parseInt(rh) / 100) + "%"}
                               value={parseInt(temp) / 100}/>
            </Col>
            <Col className="gutter-row" md={16}
                 style={{ float: 'right' }}>
                <div className='flex-center' style={{
                    justifyContent: 'space-around', marginTop: '50px', marginBottom: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '5px'
                }}>
                    <AirDataProgress color='#C54AD1' className='progress_a' width={150} height={150}
                                     progress={parseInt(pm1) / 100}
                                     pm="PM1" pmValue={pm1}/>
                    <AirDataProgress color='#ADF5F3' className='progress_b' width={150} height={150}
                                     progress={parseInt(pm25) / 100}
                                     pm="PM2.5" pmValue={pm25}/>
                    <AirDataProgress color='#CB3FF7' className='progress_c' width={150} height={150}
                                     progress={parseInt(pm10) / 100}
                                     pm="PM10" pmValue={pm10}/>
                </div>

            </Col>
            <Col className="gutter-row flex-center" md={8}>
                <BarStyleProgress airName='TVOG' prosName1='ppb' prosName2='μg/m3'
                                  prosgress1={parseInt(tvoc)}
                                  prosgress2={parseInt(tvoc_ug)}/>
            </Col>
            <Col className="gutter-row flex-center" md={8}>
                <BarStyleProgress airName='HCHO' prosName1='ppb' prosName2='μg/m3'
                                  prosgress1={parseInt(hcho)}
                                  prosgress2={parseInt(hcho_ug)}/>

            </Col>
            <Col className="gutter-row flex-center" md={8}>
                <BarStyleProgress airName='ECO2' prosName1='ppm' prosName2='μg/m3'
                                  prosgress1={parseInt(eco2)}
                                  prosgress2={parseInt(eco2_mg)}/>
            </Col>
        </Row>);
    }
}