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

}

export default BaseTableData;
