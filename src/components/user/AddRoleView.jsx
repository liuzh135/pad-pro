/**
 * @fileName: AddRoleView.jsx
 * Created on 2018-02-03
 * 弹出框 新建角色
 */
import React from "react";
import {Button, Input, Modal, Form, message} from "antd";
import {connect} from "react-redux";
import {createRole} from "../../axios";
import enUS from "../../locale/en_US";
import zhCN from "../../locale/zh_CN";

const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

const formItemLayoutArea = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

class AddRoleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({ addLoading: true });
                    createRole({
                        name: "admin1111",
                        title: values.roleName,
                        description: values.roleDes
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

    render() {
        const { title, submitText, cancelText } = this.props;
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
                    <div>
                        <FormItem {...formItemLayout} label={messagesStr.role_name}>
                            {getFieldDecorator('roleName', {
                                rules: [{
                                    required: true,
                                    message: messagesStr.input_role_name,
                                }],
                            })(
                                <Input placeholder={messagesStr.input_role_name}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayoutArea} label={messagesStr.role_description}>
                            {getFieldDecorator('roleDes', {
                                rules: [{
                                    required: true,
                                    message: messagesStr.input_role_description,
                                }],
                            })(
                                <TextArea placeholder={messagesStr.input_role_description} autosize/>
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


export default connect(mapStateToPorps)(Form.create()(AddRoleView));