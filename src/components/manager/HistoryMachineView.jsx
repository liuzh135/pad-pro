/**
 * @fileName: InputSelectPm.jsx
 * Created on 2018-02-01
 * 显示设备历史数据模块 --- 模拟设备端数据
 */
import React from "react";
import {Col, DatePicker} from "antd";
import moment from "moment/moment";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import {FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;

export class HistoryMachineView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        //默认表头 适配
        this.device_his_columns = [
            {
                title: <FormattedMessage id="device_id"/>,
                dataIndex: 'deviceId',
                width: 120,
                render: this.renderContent
            }, {
                title: 'ECO2',
                dataIndex: 'eco2',
                width: 100,
                render: this.renderContent
            }, {
                title: 'ECO2Mg',
                dataIndex: 'eco2Mg',
                width: 100,
                render: this.renderContent
            }, {
                title: 'HCHO',
                width: 100,
                dataIndex: 'hcho',
                render: this.renderContent
            }, {
                title: 'HCHOUg',
                width: 100,
                dataIndex: 'hchoUg',
                render: this.renderContent
            }, {
                title: 'PM1',
                width: 100,
                dataIndex: 'pm1',
                render: this.renderContent
            }, {
                title: 'PM10',
                width: 100,
                dataIndex: 'pm10',
                render: this.renderContent
            }, {
                title: 'RH',
                width: 100,
                dataIndex: 'rh',
                render: this.renderContent
            }, {
                title: 'PM25',
                width: 100,
                dataIndex: 'pm25',
                render: this.renderContent
            }, {
                title: 'T',
                width: 100,
                dataIndex: 't',
                render: this.renderContent
            }, {
                title: 'TVOC',
                width: 100,
                dataIndex: 'tvoc',
                render: this.renderContent
            }, {
                title: 'TVOCUg',
                width: 100,
                dataIndex: 'tvocUg',
                render: this.renderContent
            }, {
                title: <FormattedMessage id="upload_time"/>,
                width: 150,
                dataIndex: 'createTime',
                render: this.renderContent
            }
        ];
    }

    handOnChangeTime = (dates, dateStrings) => {
        const { handOnChangeTime } = this.props;
        if (typeof handOnChangeTime === "function") {
            handOnChangeTime(dates, dateStrings);
        }
    };

    handleTableChange = (paginationHis, filters, sorter) => {
        const { handleTableChange } = this.props;
        if (typeof handleTableChange === "function") {
            handleTableChange(paginationHis, filters, sorter);
        }
    };

    render() {
        const { dataSource } = this.props;

        const dateFormat = dataSource.dateFormat;
        let startDate = dataSource.startDate;
        let endDate = dataSource.endDate;
        let histroyData = dataSource.histroyData;
        let loadingHis = dataSource.loadingHis;
        let paginationHis = dataSource.paginationHis;

        return (<Col className="gutter-row" md={24}
                     style={{ paddingRight: '30px', backgroundColor: '#fff' }}>
            <div className="gutter-box ">
                <div className="gutter-box" style={{ padding: '2px 15px' }}>
                    <div className="text-title">
                        <span style={{ marginLeft: "15px" }}><FormattedMessage id="history_data_equipment"/></span>
                    </div>
                    <div className='device_text'>
                        <span className="device_text" style={{ marginRight: '20px' }}><FormattedMessage
                            id="select_time"/></span>
                        <RangePicker
                            defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                            format={dateFormat}
                            onChange={this.handOnChangeTime}
                            dateRender={(current) => {
                                const style = {};
                                if (current.date() === 1) {
                                    style.border = '1px solid #1890ff';
                                    style.borderRadius = '50%';
                                }
                                return (
                                    <div className="ant-calendar-date" style={style}>
                                        {current.date()}
                                    </div>
                                );
                            }}
                        />
                    </div>

                    <ExtBaseicTable columns={this.device_his_columns}
                                    data={histroyData}
                                    pagination={paginationHis}
                                    loading={loadingHis}
                                    bordered={true}
                                    size="small"
                                    style={{ padding: '0 10px', marginTop: '10px', lear: 'both' }}
                                    onChange={this.handleTableChange}/>
                </div>
            </div>
        </Col>);
    }
}