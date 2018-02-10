/**
 * @fileName: DeviceManager.jsx
 * Created on 2017-12-20
 * 设备管理
 */

import React from "react";
import {Col, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import BaseTableData from "../data/BaseTableData";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {getDeivceList} from '../../axios';

class DeviceManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devicelist: [],
            pagination: {},
            loading: false
        }
    }

    componentDidMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
    }

    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            if (data != null && data.rows != null){
                this.setState({
                    loading: false,
                    devicelist: data.rows,
                    pagination: {
                        total: data.records,
                        pageSize: 10,
                        current: data.page
                    }
                });
            }else {
                this.setState({
                    loading: false
                });
            }

        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.page = pagination.page;
        this.setState({
            pagination: pager
        });
        this.getDevices({
            rows: pagination.pageSize,
            page: pagination.current,
            ...filters
        });
    };

    render() {
        let tableComs = new BaseTableData();
        let devices = this.state.devicelist || [];
        // console.log("devicelist :" + JSON.stringify(devices));
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px', borderBottom: '#E9E9E9 solid 1px' }}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备管理</span>
                                </div>
                                <ExtBaseicTable columns={tableComs.device_columns}
                                                data={devices}
                                                rowKey={rowkey => {
                                                    if (rowkey.deviceOnline === 1) rowkey.deviceOnline = '在线';
                                                    if (rowkey.deviceOnline === 0) rowkey.deviceOnline = '离线';
                                                    return rowkey.deviceId;
                                                }}
                                                pagination={this.state.pagination}
                                                loading={this.state.loading}
                                                bordered={true}
                                                style={{ padding: '0 10px', clear: 'both' }}
                                                onChange={this.handleTableChange}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    <style>
                        {`
                                .ant-table-row-level-0 > td:nth-child(1)
                                ,.ant-table-row-level-0 > td:nth-child(2)
                                ,.ant-table-row-level-0 > td:nth-child(3)
                                ,.ant-table-row-level-0 > td:nth-child(4)
                                ,.ant-table-row-level-0 > td:nth-child(6)
                                ,.ant-table-row-level-0 > td:nth-child(7)
                                , .ant-table-thead > tr > th:nth-child(1)
                                , .ant-table-thead > tr > th:nth-child(2)
                                , .ant-table-thead > tr > th:nth-child(3)
                                , .ant-table-thead > tr > th:nth-child(4)
                                , .ant-table-thead > tr > th:nth-child(5)
                                , .ant-table-thead > tr > th:nth-child(6)
                                , .ant-table-thead > tr > th:nth-child(7)
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


export default connect(mapStateToPorps, mapDispatchToProps)(DeviceManager);