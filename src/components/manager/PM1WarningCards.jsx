import React from "react";
import {Button, Card, Select} from "antd";
import {InputSelectPm} from "./InputSelectPm";

const Option = Select.Option;

export class PM1WarningCards extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            pm1: [
                {
                    startValue: 0,
                    endValue: 50,
                    startmin: 0,
                    startmax: 50,
                    endmin: 0,
                    endmax: 50,
                    colorValue: "#123"
                }
                , {
                    startValue: 50,
                    endValue: 100,
                    startmin: 50,
                    startmax: 100,
                    endmin: 50,
                    endmax: 100,
                    colorValue: "#456"
                }
                , {
                    startValue: 100,
                    endValue: 150,
                    startmin: 100,
                    startmax: 150,
                    endmin: 100,
                    endmax: 150,
                    colorValue: "#789"
                }
                , {
                    startValue: 150,
                    endValue: 200,
                    startmin: 150,
                    startmax: 200,
                    endmin: 150,
                    endmax: 200,
                    colorValue: "#321"
                }
                , {
                    startValue: 200,
                    endValue: 300,
                    startmin: 200,
                    startmax: 300,
                    endmin: 200,
                    endmax: 300,
                    colorValue: "#654"
                }
            ]
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
            </Select> : "";
    };

    PmonClick = () => {
        let unit = this.state.unit || '';
        console.log(" ---get new pm1----> " + JSON.stringify(this.state));
        //提交
    };

    onPmChange = (pmVault) => {
        console.log("--------pmChange--->" + JSON.stringify(pmVault));
        if (pmVault != null) {
            let pm = this.state.pm1 || [];
            pm[pmVault.keyIndex].startValue = pmVault.startValue;
            pm[pmVault.keyIndex].endValue = pmVault.endValue;
            pm[pmVault.keyIndex].colorValue = pmVault.colorValue;
            //动态计算所有点的最大取值和最下取值
            this.claPointMinAndMax(pm);
        }

    };

    claPointMinAndMax = (star) => {
        let starTemps = star;
        for (let i = 0; i < starTemps.length; i++) {
            if (i === 0) {
                starTemps[i].startmin = 0;
                starTemps[i].startmax = starTemps[i].endValue;
                starTemps[i].endmin = starTemps[i].startValue;
                starTemps[i].endmax = starTemps[i + 1].startValue;
            } else {

            }
        }
        console.log("------starTemps--->" + JSON.stringify(starTemps));
        this.setState({
            pm1: starTemps
        });
    };

    getParmas = (keyindex) => {
        let pm1 = this.state.pm1 || [];
        return {
            onPmChange: this.onPmChange,
            keyIndex: keyindex,
            startValue: pm1[keyindex].startValue,
            endValue: pm1[keyindex].endValue,
            startmin: pm1[keyindex].startmin,
            startmax: pm1[keyindex].startmax,
            endmin: pm1[keyindex].endmin,
            endmax: pm1[keyindex].endmax,
            colorValue: pm1[keyindex].colorValue,
        };
    };

    render() {
        const { title } = this.props;
        return (<Card bordered={true}
                      title={title}
                      style={{ width: "25%" }}
                      noHovering={true}>

            <InputSelectPm title="优" {...this.getParmas(0)}/>
            <InputSelectPm title="良" {...this.getParmas(1)}/>
            <InputSelectPm title="轻度" {...this.getParmas(2)}/>
            <InputSelectPm title="中度" {...this.getParmas(3)}/>
            <InputSelectPm title="重度" {...this.getParmas(4)}/>
            <div>
                {this.getUnit()}
                <Button type="primary" onClick={this.PmonClick}>确认设置</Button>
            </div>
        </Card>);
    }
}