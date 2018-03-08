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
                    <FormItem {...formItemLayout} label="用户名称">
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: '请输入用户名称',
                            }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                   placeholder="请输入用户名称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户密码">
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: '请输入用户密码',
                            }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                                   placeholder="请输入用户密码"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认你的密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请确认你的密码"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户昵称">
                        {getFieldDecorator('realname', {
                            rules: [{
                                required: true,
                                message: '请输入用户昵称',
                            }],
                        })(
                            <Input placeholder="请输入用户昵称"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="电话号码">
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: true,
                                message: '请输入电话号码',
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入电话号码"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="电子邮件">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '请输入正确的电子邮件!',
                            }, {
                                required: true,
                                message: '请输入电子邮件',
                            }],
                        })(
                            <Input placeholder="请输入电子邮件"/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('sex', {
                            rules: [{
                                required: true,
                                message: '请选择性别',
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="0">男</Radio>
                                <Radio value="1">女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="状态"
                    >
                        {getFieldDecorator('locked', {
                            rules: [{
                                required: true,
                                message: '请账号状态',
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="0">正常</Radio>
                                <Radio value="1">锁定</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>

            </Modal> : <div></div>
        );
    }

}

export default connect()(Form.create()(AddUserView));
