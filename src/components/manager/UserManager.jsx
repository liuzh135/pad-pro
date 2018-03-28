/**
 * @fileName: ChildAccountRoleList.jsx
 * Created on 2017-12-20
 * 用户管理-角色管理
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import SearchInput from "../user/SearchInput";
import RoleList from "../user/RoleList";
import UserList from "../user/UserList";
import {FormattedMessage} from "react-intl";

class UserManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            addData: false,
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {

    }

    componentDidMount() {
    }

    onSearch = (value = {}) => {
        this.setState({
            searchValue: value
        });
    };

    onDataChange = () => {
        console.log("--->用户添加成功");
        this.setState({
            addData: !this.state.addData
        });
    };

    render() {
        let searchValue = this.state.searchValue;

        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>
                <div className="text-title">
                    <span style={{ marginLeft: "15px" }}><FormattedMessage id="user_manager"/></span>
                </div>
                <SearchInput onDataChange={this.onDataChange} indexName={<FormattedMessage id="user_name"/>}
                             addName={<FormattedMessage id="user_add"/>} isRole={2} onInputClick={this.onSearch}/>
                <UserList addData={this.state.addData} searchValue={searchValue}/>
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

export default connect(mapStateToPorps, mapDispatchToProps)(UserManager);