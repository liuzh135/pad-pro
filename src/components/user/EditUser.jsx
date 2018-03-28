/**
 * @fileName: EditUser.jsx
 * Created on 2018-02-03
 * 弹出框 修改用户信息
 */
import React from "react";
import {Button, Form, Icon, Input, message, Modal, Radio, Select} from "antd";
import {connect} from "react-redux";
import {updateUser} from "../../axios";
import enUS from "../../locale/en_US";
import zhCN from "../../locale/zh_CN";

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
                    <div>
                        <FormItem {...formItemLayout} label={messagesStr.user_name_1}>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: messagesStr.input_user_name_1,
                                }],
                                initialValue: user.username
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                       placeholder={messagesStr.input_user_name_1}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={messagesStr.user_nickname}>
                            {getFieldDecorator('realname', {
                                rules: [{
                                    required: true,
                                    message: messagesStr.input_user_nickname,
                                }],
                                initialValue: user.realname
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
                                initialValue: user.phone
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
                                initialValue: user.email
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
                                initialValue: user.sex
                            })(
                                <RadioGroup>
                                    <Radio value={0}>{messagesStr.man}</Radio>
                                    <Radio value={1}>{messagesStr.woman}</Radio>
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
                                initialValue: user.locked
                            })(
                                <RadioGroup>
                                    <Radio value={0}>{messagesStr.normal}</Radio>
                                    <Radio value={1}>{messagesStr.locked}</Radio>
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

export default connect(mapStateToPorps)(Form.create({})(EditUser));