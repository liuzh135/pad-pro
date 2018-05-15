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
import zhCN from "../../locale/zh_CN";
import enUS from "../../locale/en_US";

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
            radioId: 0,
            visible: false,
            addLoading: false
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let visible = this.props.visible || false;
        let visibleNew = nextProps.visible || false;
        if (visibleNew !== visible) {
            this.setState({
                visible: true
            });
        }
    }


    handleOk = () => {
        // const { handleOk } = this.props;
        // if (typeof handleOk === "function") {
        //     handleOk();
        // }
        console.log("--save-->");
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    console.info('success');
                    console.info('success - resName = ' + values.resName);
                    console.info('success - resValue = ' + values.resValue);
                    console.info('success - resUrl =' + values.resUrl);
                    this.setState({ addLoading: true });
                    setTimeout(() => {
                        this.setState({ addLoading: false, visible: false });
                    }, 3000);
                }
            },
        );
    };

    handleCancel = () => {
        this.setState({ visible: false });
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
        const { title, submitText, cancelText } = this.props;
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

        let visible = this.state.visible;
        let addLoading = this.state.addLoading;

        let { language } = this.props;
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;
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
                    <RadSelect onChange={this.onChange} selectList={selectArray} selectId={radioId}
                               pageName={messagesStr.permissions_select}/>

                    <div className="role-sty-t" style={{ margin: 5, borderTop: "#C7D3E3 solid 1px" }}>
                        <SelectResource valueSelect={this.state.pidValue} handleChange={this.handleChange}
                                        selectString={pidList[0]}
                                        selectable={pidList}/>
                        {radView}

                        <div style={{ marginTop: 20 }}>
                            <FormItem {...formItemLayout} label={messagesStr.permissions_name}>
                                {getFieldDecorator('resName', {
                                    rules: [{
                                        required: true,
                                        message: messagesStr.input_permissions_name,
                                    }],
                                })(
                                    <Input placeholder={messagesStr.input_permissions_name}/>
                                )}
                            </FormItem>
                            {radioId !== 0 ? <FormItem {...formItemLayout} label={messagesStr.permissions_value}>
                                {getFieldDecorator('resValue', {
                                    rules: [{
                                        required: true,
                                        message: messagesStr.input_permissions_value,
                                    }],
                                })(
                                    <Input placeholder={messagesStr.input_permissions_value}/>
                                )}
                            </FormItem> : ""}
                            {radioId !== 0 ? <FormItem {...formItemLayout} label={messagesStr.route}>
                                {getFieldDecorator('resUrl', {
                                    rules: [{
                                        required: true,
                                        message: messagesStr.input_route,
                                    }],
                                })(
                                    <Input placeholder={messagesStr.input_route}/>
                                )}
                            </FormItem> : ""}
                        </div>
                    </div>

                </Modal> : <div></div>
        );
    }

}

const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};


export default connect(mapStateToPorps)(Form.create()(AddJurisdictionView));