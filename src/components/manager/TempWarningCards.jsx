/**
 * @fileName: PM1WarningCards.jsx
 * Created on 2018-02-01
 * des: 温度和湿度 指数的预警设置界面
 */
import React from "react";
import {Button, Card, Icon, InputNumber, Select} from "antd";
import {InputSelectPm} from "./InputSelectPm";
import {SketchPicker} from 'react-color';
import {SingleInputTemp} from "./SingleInputTemp";

const Option = Select.Option;

export class TempWarningCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            selectColor: '',
            selectKeyIndex: -1,
            unit: props.menu[0],
            pm1: [],
        }
    }

    componentDidMount() {
        //模拟获取取值范围
        let pm1 = this.props.warnData || [];
        console.log(" pm1 " + JSON.stringify(pm1));
        this.setState({
            pm1: pm1,
        });
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            unit: value,
        });
    };

    getUnit = () => {
        const { menu } = this.props;
        let unit = this.state.unit || menu[0];
        let optionView = [];
        menu && menu.map((data, index) => {
            optionView.push(<Option key={index} value={data}>{data}</Option>);
        });

        return (menu && menu.length > 1) ?
            <Select defaultValue={unit} style={{ width: 120, margin: "10px 20px" }} onChange={this.handleChange}>
                {optionView}
            </Select> : menu.length > 0 ? <div><span>单位: </span><span>{menu[0]}</span></div> : "";
    };

    PmonClick = () => {
        let unit = this.state.unit || '';
        console.log(" ---get new pm1----> " + JSON.stringify(this.state));
        //提交

    };

    onPmChange = (pmVault) => {
        if (pmVault != null) {
            let pm1 = this.state.pm1 || [];
            pm1[pmVault.keyIndex].startValue = pmVault.startValue;
            pm1[pmVault.keyIndex].colorValue = pmVault.colorValue;
            //动态计算所有点的最大取值和最下取值
            this.claPointMinAndMax(pm1);
        }
    };

    /**
     * star 数据对象
     * min 数据对象
     * max 数据对象
     */
    claPointMinAndMax = (star, min, max) => {
        let starTemps = star;
        for (let i = 0; i < starTemps.length; i++) {
            if (i === 0) {
                starTemps[i].startmin = starTemps[i + 1].startValue;
            } else if (i === 1) {
                starTemps[i].startmax = starTemps[i - 1].startValue;
            }
        }
        this.setState({
            pm1: starTemps
        });
    };


    getParmas = (keyindex) => {
        let pm1 = this.state.pm1 || [];
        let parmas = {};
        if (pm1.length > 0 && pm1.length > keyindex) {
            parmas = {
                onPmChange: this.onPmChange,
                colorClick: this.colorClick,
                keyIndex: keyindex,
                startValue: pm1[keyindex].startValue,
                endValue: pm1[keyindex].endValue,
                startmin: pm1[keyindex].startmin,
                startmax: pm1[keyindex].startmax,
                endmin: pm1[keyindex].endmin,
                endmax: pm1[keyindex].endmax,
                colorValue: pm1[keyindex].colorValue,
                title: pm1[keyindex].title,
                unit: this.state.unit || '',
            };
        }
        return parmas;
    };

    onTempChange = (pmVault) => {
        if (pmVault != null) {
            let pm1 = this.state.pm1 || [];
            pm1[pmVault.keyIndex].startValue = pmVault.startValue;
            pm1[pmVault.keyIndex].colorValue = pmVault.colorValue;
            //这里强耦合 第三个参数 第二个值与下限一致  第一值与上限一致
            if (pmVault.keyIndex === 0) {
                pm1[2].endValue = pmVault.startValue;
            } else if (pmVault.keyIndex === 1) {
                pm1[2].startValue = pmVault.startValue;
            }
            //动态计算所有点的最大取值和最下取值
            this.claPointMinAndMax(pm1);
        }
    };

    getTempParmas = (keyindex) => {
        let pm1 = this.state.pm1 || [];
        let parmas = {};
        if (pm1.length > 0 && pm1.length > keyindex) {
            parmas = {
                onPmChange: this.onTempChange,
                colorClick: this.colorClick,
                keyIndex: keyindex,
                startValue: pm1[keyindex].startValue,
                startmin: pm1[keyindex].startmin,
                startmax: pm1[keyindex].startmax,
                colorValue: pm1[keyindex].colorValue,
                title: pm1[keyindex].title,
                unit: this.state.unit || '',
            };
        }
        return parmas;
    };

    colorClick = (keyIndex, colorValue) => {
        if (keyIndex === this.state.selectKeyIndex) {
            this.setState({
                displayColorPicker: !this.state.displayColorPicker,
                selectColor: colorValue,
                selectKeyIndex: keyIndex,
            });
        } else {
            this.setState({
                displayColorPicker: true,
                selectColor: colorValue,
                selectKeyIndex: keyIndex,
            });
        }
    };

    handleColorChange = (color) => {
        let pm1 = this.state.pm1 || [];
        let index = this.state.selectKeyIndex;
        pm1 && (pm1[index].colorValue = color.hex);
        this.setState({
            pm1: pm1,
            selectColor: color.hex
        });
    };

    getRangth = () => {
        let pm1 = this.state.pm1 || [];
        let rangV = [];
        pm1 && pm1.map((data, index) => {
            if (index > 1) {
                rangV.push(<InputSelectPm key={index} disabled={true} {...this.getParmas(index)}/>)
            } else {
                rangV.push(<SingleInputTemp key={index} {...this.getTempParmas(index)}/>);
            }
        });
        return rangV;
    };

    render() {
        const { title } = this.props;
        let selectColor = this.state.selectColor || "#333";
        let rangthView = this.getRangth();
        let isRight = this.props.isRight || false;

        return (<Card bordered={true}
                      title={title}
                      style={{ width: "25%", position: 'relative' }}
                      noHovering={true}>

            {rangthView}
            <div style={{ marginTop: '10px', padding: '10px' }}
                 className="flex-space-between">
                {this.getUnit()}
                <Button type="primary" onClick={this.PmonClick}>确认设置</Button>
            </div>
            {this.state.displayColorPicker && <div className={isRight ? "fix-center-right" : "fix-center"}>
                <SketchPicker
                    color={selectColor}
                    onChangeComplete={this.handleColorChange}/>
            </div>}
        </Card>);
    }
}