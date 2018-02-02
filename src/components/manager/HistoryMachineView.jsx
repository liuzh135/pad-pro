/**
 * @fileName: InputSelectPm.jsx
 * Created on 2018-02-01
 * 显示设备历史数据模块 --- 模拟设备端数据
 */
import React from "react";
import {Col, DatePicker} from "antd";
import moment from "moment/moment";
import ExtBaseicTable from "../tables/ExtBaseicTable";
import BaseTableData from "../data/BaseTableData";

const { RangePicker } = DatePicker;

export class HistoryMachineView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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
        let tableComs = new BaseTableData();
        let histroyData = dataSource.histroyData;
        let loadingHis = dataSource.loadingHis;
        let paginationHis = dataSource.paginationHis;

        return (<Col className="gutter-row" md={24}
                     style={{ paddingRight: '30px', backgroundColor: '#fff' }}>
            <div className="gutter-box ">
                <div className="gutter-box" style={{ padding: '2px 15px' }}>
                    <div className="text-title">
                        <span style={{ marginLeft: "15px" }}>设备历史采集数据</span>
                    </div>
                    <div className='device_text'>
                        <span className="device_text" style={{ marginRight: '20px' }}>选择时间</span>
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

                    <ExtBaseicTable columns={tableComs.device_his_columns}
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