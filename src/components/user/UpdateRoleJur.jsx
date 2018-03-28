/**
 * @fileName: UpdateRoleJur.jsx
 * Created on 2018-02-03
 * 弹出框 修改权限
 */
import React from "react";
import {Button, Form, Modal} from "antd";
import {connect} from "react-redux";
import {getRoleJurInfo, updataRoleByid, updataRoleByids} from "../../axios";
import SelectBox from "./SelectBox";
import SelectJurBase from "./SelectJurBase";
import {message} from "antd/lib/index";
import enUS from "../../locale/en_US";
import zhCN from "../../locale/zh_CN";

class UpdateRoleJur extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false,
            roleJurInfo: []
        };
        this.updateRole = [];
    }

    componentDidMount() {
        //获取该角色所有权限
        const { role } = this.props;
        console.log("--role->" + JSON.stringify(role));
        if (role !== undefined && role.roleId !== undefined) {
            this.getRoleInfo(role.roleId)
        }
    }

    componentWillReceiveProps(nextProps) {
        let visible = this.props.visible || false;
        let visibleNew = nextProps.visible || false;
        let role = this.props.role;
        let roleNew = nextProps.role;
        if (visibleNew !== visible) {
            this.setState({
                visible: true
            });
        }
        if (role.roleId !== roleNew.roleId) {
            this.getRoleInfo(roleNew.roleId)
        }
    }

    getRoleInfo = (roleId) => {

        getRoleJurInfo(roleId).then((data) => {
            if (data !== null && data.length > 0) {
                this.setState({
                    roleJurInfo: data
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    /**
     * 修改角色权限
     */
    handleOk = () => {
        console.log("---修改角色权限---");
        let checkedKeys = this.updateRole;
        let premisslist = this.getPremissList(checkedKeys) || [];

        console.log('getPremissList = ', JSON.stringify(premisslist));
        //提交权限列表
        const { role } = this.props;
        updataRoleByid(role.roleId, premisslist).then((data) => {
            this.setState({ addLoading: false, visible: false });
            if (data.code === 0) {
                const { onJurChange } = this.props;
                if (typeof onJurChange === "function") {
                    onJurChange();
                }
            }
        }).catch(err => {
            message.error(err);
            this.setState({ addLoading: false, visible: false });
        });

    };

    handleCancel = () => {
        this.setState({ visible: false });
    };


    getPremissList = (checkedKeys) => {
        let permissListCheck = [];
        checkedKeys.map((data, index) => {
            let arr = data.split("-");
            if (arr && arr.length > 0) {
                permissListCheck.push({
                    id: arr[arr.length - 1],
                    checked: true
                })
            }

        });
        return permissListCheck;
    };

    selectOk = (checkedKeys) => {
        console.log('selectOk--->onCheck = ', checkedKeys);
        this.updateRole = checkedKeys;

    };

    render() {
        const { submitText, cancelText, role } = this.props;
        let visible = this.state.visible;
        let addLoading = this.state.addLoading;
        let roleJurInfo = this.state.roleJurInfo;

        let { language } = this.props;
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;
        return (
            <Modal
                visible={visible}
                title={<span>{messagesStr.modify}<span
                    style={{
                        color: "#ff0000",
                        fontSize: "16px",
                        margin: "0 3px"
                    }}>{role.title}</span>{messagesStr.role_permissions}</span>}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="取消" onClick={this.handleCancel}>{cancelText}</Button>,
                    <Button key="保存" type="primary" loading={addLoading} onClick={this.handleOk}>
                        {submitText}
                    </Button>,
                ]}
            >
                <SelectJurBase roleList={roleJurInfo} selectOk={this.selectOk}/>

            </Modal>
        );
    }

}

const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};

export default connect(mapStateToPorps)(Form.create({})(UpdateRoleJur));