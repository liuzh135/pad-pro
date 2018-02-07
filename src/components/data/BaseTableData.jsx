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

    renderOperationRole = (value, row, index) => {
        return <div className="table-operation flex-center">
            <span style={{ marginRight: '4px' }}>编辑</span>
            <span style={{ marginLeft: '4px' }}>删除</span>
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
            dataIndex: 'hcho',
            width: 100,
            render: this.renderContent
        }, {
            title: 'HCHOUG',
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
            title: '湿度',
            width: 100,
            dataIndex: 'rh',
            render: this.renderContent
        }, {
            title: 'PM25',
            width: 100,
            dataIndex: 'pm25',
            render: this.renderContent
        }, {
            title: '温度',
            width: 100,
            dataIndex: 't',
            render: this.renderContent
        }, {
            title: 'TVOC',
            width: 100,
            dataIndex: 'tvoc',
            render: this.renderContent
        }, {
            title: 'TVOCUG',
            width: 100,
            dataIndex: 'tvocUg',
            render: this.renderContent
        }, {
            title: '上传时间',
            width: 150,
            dataIndex: 'upTime',
            render: this.renderContent
        }
    ];

    getApivalue = (api) => {
        return <span>{api}</span>
    };
    getdom = (dom) => {
        return <span>{dom}</span>
    };
    getwlevel = (level) => {
        return <span>{level}</span>
    };
    getpm25 = (pm25, unit) => {
        return <span>{pm25}{unit}</span>
    };
    getpm10 = (pm10, unit) => {
        return <span>{pm10}{unit}</span>
    };
    getfcontaminants = (contaminants) => {
        return <span>{contaminants}</span>
    };
    //========================数据区===========================//
    pm_data = [{
        key: '1',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }, {
        key: '2',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }, {
        key: '3',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }, {
        key: '4',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }, {
        key: '5',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }, {
        key: '6',
        doms: this.getdom('观澜'),
        aqi: this.getApivalue('97'),
        wlevel: this.getwlevel(2),
        pm25: this.getpm25('65', 'μg/m3'),
        pm10: this.getpm10('65', 'μg/m3'),
        fcontaminants: this.getfcontaminants('PM2.5'),
    }];

    //========================数据区===========================//


    pmTabledata = {
        columns: this.comIssue_columns,
        data: this.pm_data,
        bordered: true,
        pagination: { pageSize: 5 },
        style: { padding: '0 10px' }
    };


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
    device_role_columns = [
        {
            title: '角色名称',
            dataIndex: 'deviceId',
            width: 150,
            render: this.renderContent
        }, {
            title: '角色描述',
            dataIndex: 'deviceName',
            width: 250,
            render: this.renderContent
        }, {
            title: '创建时间',
            dataIndex: 'typeName',
            width: 250,
            render: this.renderContent
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            render: this.renderOperationRole
        }
    ];


    //默认表头 适配
    device_user_columns = [
        {
            title: '名称',
            dataIndex: 'deviceId',
            width: 150,
            render: this.renderContent
        }, {
            title: '手机号码',
            dataIndex: 'deviceName',
            width: 250,
            render: this.renderContent
        }, {
            title: '角色名称',
            dataIndex: 'typeName',
            width: 250,
            render: this.renderContent
        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            width: 150,
            render: this.renderContent
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 150,
            render: this.renderContent
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            render: this.renderOperationUser
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
