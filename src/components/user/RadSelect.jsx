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
            value: -1,
        }
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
        const {onChange} = this.props;
        if (typeof onChange === "function"){
            onChange(e.target.value);
        }
    };

    getRadioList = () => {
        const { selectList = [], selectId = 0 } = this.props;
        let radioArray = [];
        let id = this.state.value === -1 ? selectId : this.state.value;
        selectList.map((data, index) => {
            radioArray.push(<Radio key={index} value={index}>{data}</Radio>)
        });
        return <RadioGroup onChange={this.onChange} value={id}>
            {radioArray}
        </RadioGroup>;
    };

    render() {

        let radList = this.getRadioList();
        const { pageName} = this.props;
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