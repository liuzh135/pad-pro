/**
 * @fileName: AddUserView.jsx
 * Created on 2018-02-03
 * 弹出框 新建用户
 */
import React from "react";
import {Button, Icon, Input, message, Modal, Radio, Select} from "antd";
import {Form} from "antd/lib/index";
import {connect} from "react-redux";
import {userCreate} from "../../axios";
import enUS from "../../locale/en_US";
import zhCN from "../../locale/zh_CN";

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

class AddUserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false,
            confirmDirty: false,
            autoCompleteResult: [],
        }
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
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({ addLoading: true });
                    userCreate({
                        username: values.username,
                        password: values.password,
                        realname: values.realname,
                        phone: values.phone,
                        email: values.email,
                        sex: values.sex,
                        locked: values.locked,
                    }).then((data) => {
                        this.setState({ addLoading: false, visible: false });
                        if (data !== null) {
                            const { onRoleChange } = this.props;
                            if (typeof onRoleChange === "function") {
                                onRoleChange();
                            }
                        }
                    }).catch(err => {
                        message.error(err);
                        this.setState({ addLoading: false, visible: false });
                    });

                }
            },
        );
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('2次输入密码不一致!');
        } else {
            callback();
        }
    };

    render() {
        const { title, submitText, cancelText } = this.props;
        const { getFieldDecorator } = this.props.form;
        let visible = this.state.visible;
        let addLoading = this.state.addLoading;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        let { language } = this.props;
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;

        return (
            visible ? <Modal
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
                <div>
                    <FormItem {...formItemLayout} label={messagesStr.user_name_1}>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: messagesStr.input_user_name_1,
                            }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                   placeholder={messagesStr.input_user_name_1}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={messagesStr.pwd}>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: messagesStr.inputpwd,
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                                   placeholder={messagesStr.inputpwd}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={messagesStr.comfrom_inputpwd}
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: messagesStr.comfrom_inputpwd_input,
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}
                                   placeholder={messagesStr.comfrom_inputpwd_input}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={messagesStr.user_nickname}>
                        {getFieldDecorator('realname', {
                            rules: [{
                                required: true,
                                message: messagesStr.input_user_nickname,
                            }],
                        })(
                            <Input placeholder={messagesStr.input_user_nickname}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={messagesStr.phone}>
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true,
                                message: messagesStr.input_user_phone,
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }}
                                   placeholder={messagesStr.input_user_phone}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label={messagesStr.user_email}>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: messagesStr.input_user_email,
                            }, {
                                required: true,
                                message: messagesStr.input_user_email,
                            }],
                        })(
                            <Input placeholder={messagesStr.input_user_email}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={messagesStr.sex}
                    >
                        {getFieldDecorator('sex', {
                            rules: [{
                                required: true,
                                message: messagesStr.select_sex,
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="0">{messagesStr.man}</Radio>
                                <Radio value="1">{messagesStr.woman}</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={messagesStr.status}
                    >
                        {getFieldDecorator('locked', {
                            rules: [{
                                required: true,
                                message: messagesStr.select_state,
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="0">{messagesStr.normal}</Radio>
                                <Radio value="1">{messagesStr.locked}</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>

            </Modal> : <div></div>
        );
    }

}

const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};

export default connect(mapStateToPorps)(Form.create()(AddUserView));
