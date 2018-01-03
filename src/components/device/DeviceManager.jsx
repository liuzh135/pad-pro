/**
 * @fileName: RealDataAir.jsx
 * Created on 2017-12-20
 * 空气趋势 统计数据
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

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
        const { fetchData } = this.props;
        //调用 http请求 获取网络数据
        //fetchData({funcName: 'admin', stateName: 'auth'});
    }

    getDevices = (params = {})=> {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            this.setState({
                loading: false,
                devicelist: data.rows,
                pagination:{
                    total:data.total,
                    page:data.page,
                    records:data.records
                }
            });
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });;
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.page = pagination.page;
        this.setState({
            pagination: pager
        });
        this.getDevices({
            rows: pagination.records,
            page: pagination.page,
            ...filters
        });
    };

    componentDidMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
    }

    render() {
        let tableComs = new BaseTableData();
        let devices = this.state.devicelist || [];
        console.log("devicelist :" + JSON.stringify(devices));
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}
                         style={{ paddingRight: '30px', borderBottom: '#E9E9E9 solid 1px'}}>
                        <div className="gutter-box ">
                            <div className="gutter-box" style={{ padding: '2px 15px' }}>
                                <div className="text-title">
                                    <span style={{ marginLeft: "15px" }}>设备管理</span>
                                </div>
                                <ExtBaseicTable columns={tableComs.device_columns}
                                                rowKey={record => record.registered}
                                                dataSource={devices}
                                                data={devices}
                                                pagination={this.state.pagination}
                                                loading={this.state.loading}
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
                                    background-color: #e0e5eC;
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
    return {auth};
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(DeviceManager);