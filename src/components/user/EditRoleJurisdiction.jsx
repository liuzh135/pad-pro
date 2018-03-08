/**
 * @fileName: RoleList.jsx
 * Created on 2018-02-03
 * 弹出框 新建角色
 */
import React from "react";
import {Button, Input, Modal, Form} from "antd";
import SelectBox from "./SelectBox";
import {connect} from "react-redux";

const { TextArea } = Input;


const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class EditRoleJurisdiction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    handleOk = () => {
        const { handleOk } = this.props;
        if (typeof handleOk === "function") {
            //传递数据
            handleOk();
        }
    };

    handleCancel = () => {
        const { handleCancel } = this.props;
        if (typeof handleCancel === "function") {
            handleCancel();
        }
    };

    /**
     *  每个权限选择项的选择回调
     *  key 指定哪一个选择条
     *  checkedList 选择的内容
     */
    onChangeSelect = (select) => {
        if (select !== null) {
            console.log("---key----" + select.keyIndex);
            console.log("---checkedList----" + select.checkedList);
        }
    };


    render() {
        const { title, visible, addLoading, submitText, cancelText } = this.props;
        const { getFieldDecorator } = this.props.form;
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
                <div style={{ marginTop: '10px' }}>
                    <span style={{ marginLeft: '10px' }}>权限选择</span>
                    <div className="input-role">
                        <SelectBox keyIndex={0} onChangeSelect={this.onChangeSelect}
                                   plainOptions={["实时数据", "历史数据"]}
                                   defaultCheckedList={["实时数据"]}
                                   checkAll={"空气趋势"}/>
                        <SelectBox keyIndex={1} onChangeSelect={this.onChangeSelect}
                                   plainOptions={["实时数据", "历史数据", "设备管理"]}
                                   defaultCheckedList={["实时数据", "设备管理"]}
                                   checkAll={"设备分析"}/>
                        <SelectBox keyIndex={2} onChangeSelect={this.onChangeSelect}
                                   plainOptions={["权限管理", "用户管理", "设备预警"]}
                                   defaultCheckedList={["设备预警"]}
                                   checkAll={"系统管理"}/>
                    </div>
                </div>
            </Modal>
        );
    }

}

export default connect()(Form.create()(EditRoleJurisdiction));