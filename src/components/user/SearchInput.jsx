/**
 * @fileName: SearchInput.jsx
 * Created on 2018-02-03
 * 查询框
 */
import React from "react";
import {Button, Icon, Input} from "antd";
import ReactDOM from "react-dom";
import AddRoleView from "./AddRoleView";
import AddUserView from "./AddUserView";
import AddJurisdictionView from "./AddJurisdictionView";

const Search = Input.Search;
export default class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false,
        }
    }

    onSearch = (value) => {
        let input = ReactDOM.findDOMNode(this.refs.nameInput);
        let inputValue = input.value;
        const { onInputClick } = this.props;
        if (typeof onInputClick === "function") {
            onInputClick(inputValue);
        }

    };

    addRole = () => {
        this.showModal();
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        this.setState({ addLoading: true });
        setTimeout(() => {
            this.setState({ addLoading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { indexName, addName, isRole } = this.props;
        return (
            <div className="gutter-example button-demo input-search clearfloat">
                <div style={{ float: 'left', margin: '10px 20px' }} onClick={this.addRole}>
                    <Icon type="plus-square"/> <span className="add-role">{addName}</span>
                </div>

                <div style={{ float: 'right', margin: '5px 20px' }}>
                    <div>
                        <span style={{ margin: '0 15px' }}>{indexName}</span>
                        <Input
                            ref="nameInput"
                            style={{ width: 200 }}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" icon="search" onClick={this.onSearch}
                                style={{ margin: '0 15px' }}>查询</Button>
                    </div>
                </div>
                {
                    (isRole === 1) ? <AddRoleView
                        title="添加角色" submitText="保存" cancelText="取消"
                        visible={this.state.visible}
                        addLoading={this.state.addLoading}
                        handleCancel={this.handleCancel}
                        handleOk={this.handleOk}
                    /> : (isRole === 2) ? <AddUserView
                        title="添加用户" submitText="保存" cancelText="取消"
                        visible={this.state.visible}
                        addLoading={this.state.addLoading}
                        handleCancel={this.handleCancel}
                        handleOk={this.handleOk}
                    /> : <AddJurisdictionView
                        title="添加权限资源" submitText="保存" cancelText="取消"
                        visible={this.state.visible}
                        addLoading={this.state.addLoading}
                        handleCancel={this.handleCancel}
                        handleOk={this.handleOk}
                    />
                }
            </div>
        );
    }
}