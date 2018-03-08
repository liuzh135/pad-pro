/**
 * @fileName: EditUser.jsx
 * Created on 2018-02-03
 * 弹出框 修改用户信息
 */
import React from "react";
import {Button, Form, Icon, Input, message, Modal, Radio, Select} from "antd";
import {connect} from "react-redux";
import {updateUser} from "../../axios";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false
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

    /**
     * 修改用户信息
     */
    handleOk = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({ addLoading: true });
                    let userPd = this.props.user;
                    if (userPd !== null) {
                        userPd.username = values.username;
                        userPd.realname = values.realname;
                        userPd.phone = values.phone;
                        userPd.email = values.email;
                        userPd.sex = values.sex;
                        userPd.locked = values.locked;
                    }
                    updateUser(userPd).then((data) => {
                        this.setState({ addLoading: false, visible: false });
                        if (data !== null) {
                            const { onUserChange } = this.props;
                            if (typeof onUserChange === "function") {
                                onUserChange();
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

    render() {
        const { title, submitText, cancelText, user } = this.props;
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
                    <div>
                        <FormItem {...formItemLayout} label="用户名称">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: '请输入用户名称',
                                }],
                                initialValue: user.username
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                       placeholder="请输入用户名称"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户昵称">
                            {getFieldDecorator('realname', {
                                rules: [{
                                    required: true,
                                    message: '请输入用户昵称',
                                }],
                                initialValue: user.realname
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
                                initialValue: user.phone
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
                                initialValue: user.email
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
                                initialValue: user.sex
                            })(
                                <RadioGroup>
                                    <Radio value={0}>男</Radio>
                                    <Radio value={1}>女</Radio>
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
                                initialValue: user.locked
                            })(
                                <RadioGroup>
                                    <Radio value={0}>正常</Radio>
                                    <Radio value={1}>锁定</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>

                </Modal> : <div></div>
        );
    }
}

export default connect()(Form.create({})(EditUser));