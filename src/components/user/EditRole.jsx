/**
 * @fileName: EditRole.jsx
 * Created on 2018-02-03
 * 弹出框 修改角色信息
 */
import React from "react";
import {Button, Form, Input, message, Modal} from "antd";
import {connect} from "react-redux";
import {updateRole} from "../../axios";

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

class EditRole extends React.Component {

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

    /**
     * 修改角色权限
     */
    handleOk = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({ addLoading: true });
                    let rolePd = this.props.role;
                    if (rolePd !== null) {
                        rolePd.title = values.roleName;
                        rolePd.description = values.roleDes;
                    }
                    updateRole(rolePd).then((data) => {
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
        const { title, submitText, cancelText, role } = this.props;
        const { getFieldDecorator } = this.props.form;
        let visible = this.state.visible;
        let addLoading = this.state.addLoading;
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
                        <FormItem {...formItemLayout} label="角色名称">
                            {getFieldDecorator('roleName', {
                                rules: [{
                                    required: true,
                                    message: '请输入角色名称',
                                }],
                                initialValue: role.title
                            })(
                                <Input placeholder="请输入权限资源名称"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayoutArea} label="角色描述">
                            {getFieldDecorator('roleDes', {
                                rules: [{
                                    required: true,
                                    message: '请输入角色描述',
                                }],
                                initialValue: role.description
                            })(
                                <TextArea placeholder="请输入角色描述" autosize/>
                            )}
                        </FormItem>
                    </div>

                </Modal> : <div></div>
        );
    }

}

export default connect()(Form.create({})(EditRole));