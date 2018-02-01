import React from "react";
import {InputNumber} from 'antd';

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
        }
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

    render() {
        const { title, startValue, startmin, startmax, endmin, endmax, endValue, colorValue } = this.props;

        console.log("-->startmin=" + startmin + "--->startmax=" + startmax);
        console.log("-->endmin=" + endmin + "--->endmax=" + endmax);

        return (<div style={{ width: '100%' }} className="flex-space-between">
            <span style={{ display: 'inline-block', width: '20%' }}>{title}<span
                style={{ margin: '0 3px' }}>:</span></span>
            <div style={{ width: '50%' }} className="pmdiv">
                <InputNumber style={{ width: 60, margin: '2px' }} key={1} onChange={this.onPmChange1}
                             min={startmin} max={startmax} defaultValue={startValue}/>
                <InputNumber style={{ width: 60, margin: '2px' }} key={2} onChange={this.onPmChange2}
                             min={endmin} max={endmax} defaultValue={endValue}/>
            </div>
            <div style={{
                cursor: 'pointer',
                display: 'inline-block',
                backgroundColor: colorValue,
                width: '40px',
                height: '30px'
            }}/>
        </div>);
    }
}