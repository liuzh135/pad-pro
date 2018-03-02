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

class ChildAccountRoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
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

    render() {
        let searchValue = this.state.searchValue;
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>
                <div className="text-title">
                    <span style={{ marginLeft: "15px" }}>角色管理</span>
                </div>
                <SearchInput indexName="角色名称" addName="添加角色" isRole={true} onInputClick={this.onSearch}/>
                <RoleList searchValue={searchValue}/>
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