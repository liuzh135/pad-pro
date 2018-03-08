/**
 * @fileName: CheckBoxGradio.jsx
 * Created on 2018-02-03
 * 多选框选择器
 */
import React from "react";
import {Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;
export default class CheckBoxGradio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsUserRoles: []
        }
    }

    componentWillReceiveProps(next) {

        if (next.upmsUserRoles !== this.props.upmsUserRoles) {
            this.setState({
                optionsUserRoles: this.getOptionsUserRoles(next.upmsUserRoles)
            });
        }
    }

    onChange = (checkedValues) => {
        this.setState({
            optionsUserRoles: checkedValues
        });
        const { onChange } = this.props;
        if (typeof onChange === "function") {
            onChange(checkedValues);
        }
    };

    getOptionList = (upmsRoles) => {
        let roles = [];
        upmsRoles.map((data, index) => {
            roles.push({
                label: data.title,
                value: data.roleId,
            })
        });
        return roles;
    };

    getOptionsUserRoles = (upmsUserRoles) => {
        let userRoles = [];
        upmsUserRoles.map((data, index) => {
            userRoles.push(data.roleId)
        });
        return userRoles;
    };

    getRadioList = () => {
        const { upmsRoles = [] } = this.props;
        let optionsRoles = this.getOptionList(upmsRoles);
        return <CheckboxGroup options={optionsRoles} value={this.state.optionsUserRoles} onChange={this.onChange}/>;
    };

    render() {

        let radList = this.getRadioList();
        const { pageName } = this.props;
        return (
            <div className="gutter-example button-demo" style={{ padding: '5px', marginTop: '5px' }}>
                <div className="role-sty">
                    <p>{pageName}</p>
                </div>
                <div className="role-sty-t">
                    {radList}
                </div>
            </div>
        );
    }
}