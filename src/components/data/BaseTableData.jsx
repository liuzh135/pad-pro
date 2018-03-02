/**
 * @fileName: BaseTableData.jsx
 * Created on 2017-12-20
 * 默认数据区  表格
 */
import React from 'react';

class BaseTableData {
    renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };
        return obj;
    };

    objrender = (value, ind, start, len) => {
        const obj = {
            children: value,
            props: {},
        };
        if (ind === start) {
            obj.props.rowSpan = len;
        } else {

            for (let index = start + 1; index < start + len; index++) {
                if (ind === index) {
                    obj.props.rowSpan = 0;
                }
            }
        }
        return obj;
    };


    isArray = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    renderOperationContent = (value, row, index) => {
        return <div className="table-operation flex-center">
            <a href={"/#/app/device/realdevicedata?deviceId=" + row.deviceId} style={{ marginRight: '4px' }}>实时数据</a><a
            style={{ marginLeft: '4px' }}
            href={"/#/app/device/historydata?deviceId=" + row.deviceId}>历史数据</a>
        </div>;
    };
    editRole = (row) => {
        console.log("editRole = " + row.roleId);
    };
    delRole = (row) => {
        console.log("delRole = " + row.roleId);
    };

    renderOperationRole = (value, row, index) => {
        console.log("---row" + JSON.stringify(row));
        return <div className="table-operation flex-center">
            <span onClick={() => {
                this.editRole(row)
            }} className="table-span" style={{ marginRight: '4px' }}>编辑</span>
            <span onClick={() => {
                this.delRole(row)
            }} className="table-span" style={{ marginLeft: '4px' }}>删除</span>
        </div>;
    };

    renderOperationUser = (value, row, index) => {
        return <div className="table-operation flex-center">
            <span style={{ marginRight: '4px' }}>编辑</span>
            <span style={{ marginLeft: '4px' }}>重置密码</span>
            <span style={{ marginLeft: '4px' }}>删除</span>
        </div>;
    };


    //默认表头 适配
    comIssue_columns = [
        {
            title: '监控站点ID',
            dataIndex: 'deviceId',
            width: 100,
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
            title: 'PM25',
            width: 100,
            dataIndex: 'pm25',
            render: this.renderContent
        }, {
            title: '首要污染物',
            width: 100,
            dataIndex: 'mainPm',
            render: this.renderContent
        }, {
            title: '上传时间',
            width: 150,
            dataIndex: 'upTime',
            render: this.renderContent
        }
    ];

    //默认表头 适配
    device_columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId',
            width: 150,
            render: this.renderContent
        }, {
            title: '设备名称',
            dataIndex: 'deviceName',
            width: 150,
            render: this.renderContent
        }, {
            title: '设备类型',
            dataIndex: 'typeName',
            width: 150,
            render: this.renderContent
        }, {
            title: '创建时间',
            width: 150,
            dataIndex: 'updateTime',
            render: this.renderContent
        }, {
            title: '设备地址',
            width: 150,
            dataIndex: 'address',
            render: this.renderContent
        }, {
            title: '在线状态',
            width: 150,
            dataIndex: 'deviceOnline',
            render: this.renderContent
        }, {
            title: '操作',
            width: 150,
            dataIndex: 'operation',
            render: this.renderOperationContent
        }
    ];



    //默认表头 适配
    device_his_columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId',
            width: 100,
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
            title: '上传时间',
            width: 150,
            dataIndex: 'createTime',
            render: this.renderContent
        }
    ];
}

export default BaseTableData;
