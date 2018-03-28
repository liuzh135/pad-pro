/**
 * @fileName: ChildAccountRoleList.jsx
 * Created on 2017-12-20
 * 用户管理-角色管理
 */

import React from "react";
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import SearchInput from "./SearchInput";
import RoleList from "./RoleList";
import {FormattedMessage} from "react-intl";

class ChildAccountRoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            addData: false,
        }
    }

    onSearch = (value = {}) => {
        this.setState({
            searchValue: value
        });
    };

    onDataChange = () => {
        this.setState({
            addData: !this.state.addData
        });
    };

    render() {
        let searchValue = this.state.searchValue;
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>
                <div className="text-title">
                    <span style={{ marginLeft: "15px" }}><FormattedMessage id="role_manager"/></span>
                </div>
                <SearchInput onDataChange={this.onDataChange} indexName={<FormattedMessage id="role_name"/>}
                             addName={<FormattedMessage id="role_add"/>} isRole={1}
                             onInputClick={this.onSearch}/>
                <RoleList addData={this.state.addData} searchValue={searchValue}/>
                {
                    <style>
                        {`
                                .ant-table-row-level-0 > td
                                , .ant-table-thead > tr > th
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

export default connect(mapStateToPorps, mapDispatchToProps)(ChildAccountRoleList);