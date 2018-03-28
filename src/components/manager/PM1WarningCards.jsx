/**
 * @fileName: PM1WarningCards.jsx
 * Created on 2018-02-01
 * des: Pm空气指数的设置界面
 */
import React from "react";
import {Button, Card, Select} from "antd";
import {InputSelectPm} from "./InputSelectPm";
import {SketchPicker} from 'react-color';
import {FormattedMessage} from "react-intl";

const Option = Select.Option;

export class PM1WarningCards extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            selectColor: '',
            selectKeyIndex: -1,
            unit: props.menu[0],
            color: 0,
            pm1: []
        }
    }

    componentDidMount() {
        //模拟获取取值范围
        let pm1 = this.props.warnData || [];
        console.log(" pm1 " + JSON.stringify(pm1));
        this.setState({
            pm1: pm1
        });
    }

    componentWillReceiveProps(nextProps) {
        let color = this.state.color;
        let colorNew = nextProps.showColor;
        // console.log(" color " + color + "####colorNew = " + colorNew);
        if (colorNew - color === 1 && color !== 1) {
            this.setState({
                displayColorPicker: false,
                color: colorNew,
            });
        } else {
            this.setState({
                color: colorNew,
            });
        }
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
            </Select> : menu.length > 0 ?
                <div><span><FormattedMessage id="unit"/>:  </span><span>{menu[0]}</span></div> : "";
    };

    PmonClick = () => {
        let unit = this.state.unit || '';
        console.log(" ---get new pm1----> " + JSON.stringify(this.state));
        //提交 组装数据提交服务器

    };

    onPmChange = (pmVault) => {
        if (pmVault != null) {
            let pm = this.state.pm1 || [];
            pm[pmVault.keyIndex].startValue = pmVault.startValue;
            pm[pmVault.keyIndex].endValue = pmVault.endValue;
            pm[pmVault.keyIndex].colorValue = pmVault.colorValue;
            //动态计算所有点的最大取值和最下取值
            this.claPointMinAndMax(pm);
        }
    };

    /**
     * star 数据对象
     * min 数据对象
     * max 数据对象
     */
    claPointMinAndMax = (star, min, max) => {
        let starTemps = star;
        let firstMin = min || 0;
        let lastMax = max || 300;
        for (let i = 0; i < starTemps.length; i++) {
            if (i === 0) {
                starTemps[i].startmin = firstMin;
                starTemps[i].endmax = starTemps[i + 1].startValue;
            } else if (i === starTemps.length - 1) {
                starTemps[i].startmin = starTemps[i - 1].endValue;
                starTemps[i].endmax = lastMax;
            } else {
                starTemps[i].startmin = starTemps[i - 1].endValue;
                starTemps[i].endmax = starTemps[i + 1].startValue;
            }
            starTemps[i].startmax = starTemps[i].endValue;
            starTemps[i].endmin = starTemps[i].startValue;
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
            };
        }
        return parmas;
    };

    colorClick = (keyIndex, colorValue) => {
        // console.log("--------------keyIndex-------------->" + keyIndex);
        if (keyIndex === this.state.selectKeyIndex) {
            this.setState({
                displayColorPicker: !this.state.displayColorPicker,
                selectColor: colorValue,
                selectKeyIndex: keyIndex,
                color: this.state.color++
            });
        } else {
            this.setState({
                displayColorPicker: true,
                selectColor: colorValue,
                selectKeyIndex: keyIndex,
                color: this.state.color++
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
            rangV.push(<InputSelectPm key={index} {...this.getParmas(index)}/>)
        });
        return rangV;
    };

    onColorPickClick = (event) => {
        event.stopPropagation();//阻止点击事件的冒泡事件
    };

    render() {
        const { title } = this.props;
        let selectColor = this.state.selectColor || "#333";
        let rangthView = this.getRangth();
        let isRight = this.props.isRight || false;

        let displayColorPicker = this.state.displayColorPicker;

        return (<Card bordered={true}
                      title={title}
                      style={{ width: "25%", position: 'relative' }}
                      noHovering={true}>

            {rangthView}
            <div style={{ marginTop: '10px', padding: '10px' }}
                 className="flex-space-between">
                {this.getUnit()}
                <Button type="primary" onClick={this.PmonClick}><FormattedMessage id="save"/></Button>
            </div>
            {displayColorPicker &&
            <div className={isRight ? "fix-center-right" : "fix-center"} onClick={this.onColorPickClick}>
                <SketchPicker
                    disableAlpha={true}
                    color={selectColor}
                    onChangeComplete={this.handleColorChange}/>
            </div>}
        </Card>);
    }
}