/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 弹出框 新建用户
 */
import React from "react";
import {Button, Input, Modal} from "antd";
import SelectBox from "./SelectBox";
import InputData from "./InputData";
import RadSelect from "./RadSelect";

const { TextArea } = Input;

export default class AddUserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    handleOk = () => {
        const { handleOk } = this.props;
        if (typeof handleOk === "function") {
            handleOk();
        }
    };

    handleCancel = () => {
        const { handleCancel } = this.props;
        if (typeof handleCancel === "function") {
            handleCancel();
        }
    };

    render() {
        const { title, visible, addLoading, submitText, cancelText } = this.props;
        let selectArray = ["超级管理员", "管理员"];
        return (
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
                <InputData indexName="用户名"/>
                <InputData indexName="密码"/>
                <InputData indexName="确认密码"/>
                <InputData indexName="手机号"/>
                <RadSelect selectList={selectArray} selectId={1} pageName="角色选择"/>
            </Modal>
        );
    }

}