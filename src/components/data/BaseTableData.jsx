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


    //默认表头 适配
    comIssue_columns = [
        {
            title: '监控站点',
            dataIndex: 'doms',
            width: 150,
            render: this.renderContent
        }, {
            title: 'AQI',
            dataIndex: 'aqi',
            width: 150,
            render: this.renderContent
        }, {
            title: '污染等级',
            dataIndex: 'wlevel',
            width: 150,
            render: this.renderContent
        }, {
            title: 'PM2.5浓度',
            dataIndex: 'pm25',
            width: 150,
            render: this.renderContent
        }, {
            title: 'PM10浓度',
            width: 150,
            dataIndex: 'pm10',
            render: this.renderContent
        }, {
            title: '首要污染物',
            width: 150,
            dataIndex: 'fcontaminants',
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
        pagination: {pageSize: 5},
        style: {padding: '0 10px'}
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
        },{
            title: '设备类型',
            dataIndex: 'typeName',
            width: 150,
            render: this.renderContent
        }, {
            title: 'UUID',
            dataIndex: 'uuid',
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
        }
    ];

    device_data = [{
        key: '1',
        deviceId: "1",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '2',
        deviceId: "2",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '3',
        deviceId: "3",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '4',
        deviceId: "4",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '5',
        deviceId: "5",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '6',
        deviceId: "5",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '7',
        deviceId: "5",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '8',
        deviceId: "5",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }, {
        key: '9',
        deviceId: "5",
        bindtime: "2017.12.22",
        onlineTime: "2天",
        devicestate: "正常",
        devicepos: "深圳",
    }];

    deviceTabledata = {
        columns: this.device_columns,
        data: this.device_data,
        bordered: true,
        pagination: {pageSize: 8, showQuickJumper: true},
        style: {padding: '0 10px', clear: 'both'}
    };


}

export default BaseTableData;
