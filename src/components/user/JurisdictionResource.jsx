/**
 * @fileName: JurisdictionResource.jsx
 * Created on 2017-12-20
 * 用户管理-权限资源管理
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import SearchInput from "./SearchInput";
import ResourceList from "./ResourceList";
import {FormattedMessage} from "react-intl";

class JurisdictionResource extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
        }
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
                    <span style={{ marginLeft: "15px" }}><FormattedMessage id="role_manager"/></span>
                </div>
                <SearchInput indexName={<FormattedMessage id="jurisdiction_name"/>} addName={<FormattedMessage id="jurisdiction_add"/>} isRole={3} onInputClick={this.onSearch}/>
                <ResourceList searchValue={searchValue}/>
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

export default connect(mapStateToPorps, mapDispatchToProps)(JurisdictionResource);