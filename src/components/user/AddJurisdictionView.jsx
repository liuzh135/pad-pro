/**
 * @fileName: AddJurisdictionView.jsx
 * Created on 2018-02-03
 * 弹出框 新建权限资源
 */
import React from "react";
import {Button, Form, Input, Modal} from "antd";
import RadSelect from "./RadSelect";
import SelectResource from "./SelectResource";
import {connect} from "react-redux";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class AddJurisdictionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rourceList: [{
                pidName: "空气趋势",
                subList: ["实时数据", "统计数据"]
            }, {
                pidName: "设备分析",
                subList: ["实时数据", "历史数据", "设备管理"]
            }, {
                pidName: "系统管理",
                subList: ["权限资源管理", "角色管理", "用户管理", "设备预警"]
            }],
            selectArray: ["目录", "菜单"],
            pidList: [],
            subList: [],
            pidValue: 0,
            subValue: 0,
            radioId: 0
        }
    }

    componentDidMount() {
    }

    handleOk = () => {
        // const { handleOk } = this.props;
        // if (typeof handleOk === "function") {
        //     handleOk();
        // }
        console.log("--save-->");
        this.props.form.validateFields(
            (err,values) => {
                if (!err) {
                    console.info('success');
                    console.info('success - resName = ' + values.resName);
                    console.info('success - resValue = ' + values.resValue);
                    console.info('success - resUrl =' + values.resUrl);
                }
            },
        );
    };

    handleCancel = () => {
        const { handleCancel } = this.props;
        if (typeof handleCancel === "function") {
            handleCancel();
        }
    };

    // 单选框选择器
    onChange = (e) => {
        console.log('radio checked =' + e);
        this.setState({
            radioId: e
        });
    };

    // 下拉框选择器0
    handleChange = (e) => {
        console.log('Select0 checked =' + e);
        let rourceList = this.state.rourceList || [];
        this.setState({
                subList: rourceList[e].subList,
                pidValue: e,
                subValue: 0
            }
        );
    };

    // 下拉框选择器1
    handleChange1 = (e) => {
        console.log('Select1 checked =' + e);
        this.setState({
                subValue: e
            }
        );
    };


    render() {
        const { title, visible, addLoading, submitText, cancelText } = this.props;
        let rourceList = this.state.rourceList || [];
        let pidList = this.state.pidList || [];
        if (pidList.length === 0) {
            rourceList.map((data, index) => {
                pidList.push(data.pidName)
            });
        }

        let subList = this.state.subList || [];
        if (subList.length === 0) {
            subList = rourceList[0].subList;
        }

        let selectArray = this.state.selectArray || [];
        let radioId = this.state.radioId;
        let radView = radioId !== 0 ?
            <SelectResource valueSelect={this.state.subValue} handleChange={this.handleChange1}
                            selectString={subList[0]}
                            selectable={subList}/> : "";

        const { getFieldDecorator } = this.props.form;

        return (
            visible ?
                <Modal
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="取消" onClick={this.handleCancel}>{cancelText}</Button>,
                        <Button key="保存" type="primary" loading={addLoading} onClick={this.handleOk}>
                            {submitText}
                        </Button>,
                    ]}
                >
                    <RadSelect onChange={this.onChange} selectList={selectArray} selectId={radioId} pageName="权限选择"/>

                    <div className="role-sty-t" style={{ margin: 5, borderTop: "#C7D3E3 solid 1px" }}>
                        <SelectResource valueSelect={this.state.pidValue} handleChange={this.handleChange}
                                        selectString={pidList[0]}
                                        selectable={pidList}/>
                        {radView}

                        <div style={{ marginTop: 20 }}>
                            <FormItem {...formItemLayout} label="名称">
                                {getFieldDecorator('resName', {
                                    rules: [{
                                        required: true,
                                        message: '请输入权限资源名称',
                                    }],
                                })(
                                    <Input placeholder="请输入权限资源名称"/>
                                )}
                            </FormItem>
                            {radioId !== 0 ? <FormItem {...formItemLayout} label="权限值">
                                {getFieldDecorator('resValue', {
                                    rules: [{
                                        required: true,
                                        message: '请输入权限值',
                                    }],
                                })(
                                    <Input placeholder="请输入权限值"/>
                                )}
                            </FormItem> : ""}
                            {radioId !== 0 ? <FormItem {...formItemLayout} label="路径">
                                {getFieldDecorator('resUrl', {
                                    rules: [{
                                        required: true,
                                        message: '请输入路径',
                                    }],
                                })(
                                    <Input placeholder="请输入路径"/>
                                )}
                            </FormItem> : ""}
                        </div>
                    </div>

                </Modal> : <div></div>
        );
    }

}

export default connect()(Form.create()(AddJurisdictionView));