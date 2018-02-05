/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 li数据
 */

import React from "react";
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import HistoryEcharView from "./HistoryEcharView";
import SelectCityAndDevice from "./SelectCityAndDevice";


class StatisticalDeviceData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mac: '',
            address: '',
            province: [],
            deviceId: 0,
        }
    }

    getSelectDevice = (deviceId) => {
        console.log("select device = " + deviceId);
        this.setState({
            deviceId: deviceId
        });
    };

    render() {
        let deviceId = this.state.deviceId;
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备历史数据</span>
                                </div>
                                <div style={{ border: '1px solid #C7D3E3' }}>
                                    <SelectCityAndDevice selectDevice={this.getSelectDevice}/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <HistoryEcharView deviceId={deviceId} type={1}/>
                    <HistoryEcharView deviceId={deviceId} type={2}/>
                    {/*<HistoryEcharView deviceId={deviceId} type={3}/>*/}
                </Row>
                {
                    <style>
                        {`
                                .ant-table-row-level-0 > td:nth-child(1)
                                ,.ant-table-row-level-0 > td:nth-child(2)
                                ,.ant-table-row-level-0 > td:nth-child(3)
                                ,.ant-table-row-level-0 > td:nth-child(4)
                                ,.ant-table-row-level-0 > td:nth-child(5)
                                , .ant-table-thead > tr > th:nth-child(1)
                                , .ant-table-thead > tr > th:nth-child(2)
                                , .ant-table-thead > tr > th:nth-child(3)
                                , .ant-table-thead > tr > th:nth-child(4)
                                , .ant-table-thead > tr > th:nth-child(5)
                                {
                                    text-align: center;
                                }
                                .ant-table-thead{
                                    background-color: #EDEEF2;
                                }
                                .ant-table-thead > tr > th{
                                   background: transparent;
                                }
                                .ant-table-thead > tr > th{
                                    padding: 10px 8px;
                                }
                                .ant-table-large {
                                    width: 100%;
                                }
                                .ant-spin-container {
                                    position: relative;
                                    display: flex;
                                    flex-wrap: wrap;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                }
                        `}
                    </style>
                }
            </div>
        )
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(StatisticalDeviceData);