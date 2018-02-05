/**
 * @fileName: SearchInput.jsx
 * Created on 2018-02-03
 * 单选框
 */
import React from "react";
import {Radio} from 'antd';

const RadioGroup = Radio.Group;
export default class RadSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { selectList, selectId } = this.props;
        return (
            <div className="gutter-example button-demo" style={{ padding: '5px', marginTop: '5px' }}>
                <div className="role-sty">
                    <p>角色选择</p>
                </div>
                <div className="role-sty-t">
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>采购</Radio>
                        <Radio value={2}>工程师</Radio>
                    </RadioGroup>
                </div>
            </div>
        );
    }
}