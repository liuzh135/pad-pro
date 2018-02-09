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

class UserManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {

    }

    componentDidMount() {
    }

    onSearch = (value = {}) => {
        console.log("onSearch:" + value);

    };

    render() {
        //设备预警的卡片--空气
        return (
            <div className="gutter-example button-demo" style={{ backgroundColor: '#fff' }}>
                <div className="text-title">
                    <span style={{ marginLeft: "15px" }}>用户管理</span>
                </div>
                <SearchInput indexName="用户名" addName="添加用户" onInputClick={this.onSearch}/>
                <UserList/>
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
    return { auth };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(UserManager);