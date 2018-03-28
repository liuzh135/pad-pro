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
import {FormattedMessage} from "react-intl";

const Search = Input.Search;
export default class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
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
            visible: !this.state.visible
        });
    };

    onRoleChange = () => {
        const { onDataChange } = this.props;
        if (typeof onDataChange === "function") {
            onDataChange();
        }
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
                                style={{ margin: '0 15px' }}><FormattedMessage id="query"/> </Button>
                    </div>
                </div>
                {
                    (isRole === 1) ? <AddRoleView
                        title={<FormattedMessage id="role_add"/>}
                        submitText={<FormattedMessage id="save_e"/>}
                        cancelText={<FormattedMessage id="cancel"/>}
                        visible={this.state.visible}
                        onRoleChange={this.onRoleChange}
                    /> : (isRole === 2) ? <AddUserView
                        title={<FormattedMessage id="user_add"/>}
                        submitText={<FormattedMessage id="save_e"/>}
                        cancelText={<FormattedMessage id="cancel"/>}
                        visible={this.state.visible}
                        onRoleChange={this.onRoleChange}
                    /> : <AddJurisdictionView
                        title={<FormattedMessage id="jurisdiction_add"/>}
                        submitText={<FormattedMessage id="save_e"/>}
                        cancelText={<FormattedMessage id="cancel"/>}
                        visible={this.state.visible}
                    />
                }
            </div>
        );
    }
}