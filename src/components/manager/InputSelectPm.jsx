/**
 * @fileName: InputSelectPm.jsx
 * Created on 2018-02-01
 * 设备预警模块---输入框控件
 */
import React from "react";

import {Alert, Button, InputNumber} from 'antd';


export class InputSelectPm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            startValue: props.startValue,
            endValue: props.endValue,
            colorValue: props.colorValue,
            startmin: props.startmin,
            startmax: props.startmax,
            endmin: props.endmin,
            endmax: props.endmax,
            displayColorPicker: true,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            startValue: nextProps.startValue,
            endValue: nextProps.endValue,
            colorValue: nextProps.colorValue,
            startmin: nextProps.startmin,
            startmax: nextProps.startmax,
            endmin: nextProps.endmin,
            endmax: nextProps.endmax,
        });
    }

    onPmChange1 = (value) => {
        const { onPmChange, keyIndex } = this.props;
        if (typeof onPmChange === "function") {
            onPmChange({
                keyIndex: keyIndex,
                startValue: value,
                endValue: this.state.endValue,
                colorValue: this.state.colorValue,

            });
        }
        this.setState({
            startValue: value
        });
    };

    onPmChange2 = (value) => {
        const { onPmChange, keyIndex } = this.props;
        if (typeof onPmChange === "function") {
            onPmChange({
                keyIndex: keyIndex,
                startValue: this.state.startValue,
                endValue: value,
                colorValue: this.state.colorValue,
            });
        }
        this.setState({
            endValue: value
        });
    };
    onChangeColor = () => {
        const { colorClick, colorValue, keyIndex } = this.props;
        if (colorClick != null && typeof  colorClick === "function") {
            colorClick(keyIndex, colorValue);
        }
    };

    render() {
        const { title, startValue, startmin, startmax, endmin, endmax, endValue, colorValue } = this.props;
        let unit = this.props.unit || '';
        let disabled = this.props.disabled || false;
        return ((colorValue) ?
            <div style={{ width: '100%' }} className="flex-space-between">
            <span style={{ display: 'inline-block', textAlign: 'center', width: '20%' }}>{title}<span
                style={{ margin: '0 3px' }}>:</span></span>
                <div style={{ width: '50%' }} className="pmdiv">
                    <InputNumber style={{ width: "45%", margin: '2px' }} key={1} disabled={disabled}
                                 onChange={this.onPmChange1}
                                 formatter={value => {
                                     return `${value}` + unit
                                 }}
                                 parser={value => value.replace(unit, '')}
                                 value={startValue}
                                 min={startmin} max={startmax} defaultValue={startValue}/>
                    <InputNumber style={{ width: "45%", margin: '2px' }} key={2} disabled={disabled}
                                 onChange={this.onPmChange2}
                                 formatter={value => {
                                     return `${value}` + unit
                                 }}
                                 parser={value => value.replace(unit, '')}
                                 value={endValue}
                                 min={endmin} max={endmax} defaultValue={endValue}/>
                </div>
                <Button style={{
                    cursor: 'pointer',
                    display: 'inline-block',
                    backgroundColor: colorValue,
                    width: '40px',
                    height: '30px'
                }} onClick={this.onChangeColor}/>

            </div> : <Alert
                message="预警方案错误"
                description="联系后台管理人员，查看预警方案的异常信息"
                type="error"
                showIcon
            />);
    }
}