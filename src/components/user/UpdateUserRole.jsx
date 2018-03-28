/**
 * @fileName: UpdateUserRole.jsx
 * Created on 2018-02-03
 * 弹出框 修改用户角色信息
 */
import React from "react";
import {Button, Form, Modal} from "antd";
import {connect} from "react-redux";
import {getUserRoleInfo, updataUserByid} from "../../axios";
import CheckBoxGradio from "./CheckBoxGradio";
import {message} from "antd/lib/index";
import enUS from "../../locale/en_US";
import zhCN from "../../locale/zh_CN";

class UpdateUserRole extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addLoading: false,
            upmsRoles: [],
            upmsUserRoles: []
        };
        this.updateUser = [];
    }

    componentDidMount() {
        //获取该角色所有权限
        const { user } = this.props;
        console.log("--user->" + JSON.stringify(user));
        if (user !== null && user.userId !== undefined) {
            console.log("--user->222222222222222")
            this.getUserRoleInfo(user.userId)
        }
    }

    componentWillReceiveProps(nextProps) {
        let visible = this.props.visible || false;
        let visibleNew = nextProps.visible || false;
        let user = this.props.user;
        let userNew = nextProps.user;
        if (visibleNew !== visible) {
            this.setState({
                visible: true
            });
        }
        if (userNew.userId !== user.userId) {
            this.getUserRoleInfo(userNew.userId)
        }
    }

    getUserRoleInfo = (userId) => {
        getUserRoleInfo(userId).then((data) => {
            if (data !== null && data.code === 0 && data.data !== null) {
                this.setUpsData(data.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    setUpsData = (data) => {
        this.setState({
            upmsRoles: data.upmsRoles,
            upmsUserRoles: data.upmsUserRoles
        });
    };

    /**
     * 修改角色权限
     */
    handleOk = () => {
        this.upDataUserRole(this.updateUser);
    };

    upDataUserRole = (ids) => {
        let user = this.props.user;
        this.setState({ addLoading: true });
        updataUserByid(user.userId, ids).then((data) => {
            console.log("---修改用户角色---");
            this.setState({ addLoading: false, visible: false });
            if (data.code === 0) {
                this.getUserRoleInfo(user.userId);
                const { onUserRoleChange } = this.props;
                if (typeof onUserRoleChange === "function") {
                    onUserRoleChange();
                }
            }
        }).catch(err => {
            message.error(err);
            this.setState({ addLoading: false, visible: false });
        });

    };

    // upDataUserRole = (ids) => {
    //     let user = this.props.user;
    //     this.setState({ addLoading: true });
    //     updataUserByid(user.userId, ids, () => {
    //         console.log("---修改用户角色---");
    //         this.setState({ addLoading: false, visible: false });
    //         const { onUserRoleChange } = this.props;
    //         if (typeof onUserRoleChange === "function") {
    //             onUserRoleChange();
    //         }
    //         this.getUserRoleInfo(user.userId);
    //     });
    // };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onChange = (data) => {
        console.log("select gd" + data);
        this.updateUser = data;
    };

    render() {
        const { submitText, cancelText, user } = this.props;
        let visible = this.state.visible;
        let addLoading = this.state.addLoading;
        let upmsRoles = this.state.upmsRoles;
        let upmsUserRoles = this.state.upmsUserRoles;

        let { language } = this.props;
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;

        console.log("--- upmsUserRoles->" + JSON.stringify(upmsUserRoles));
        return (
            <Modal
                visible={visible}
                title={<span>{messagesStr.modify}<span
                    style={{
                        color: "#ff0000",
                        fontSize: "16px",
                        margin: "0 3px"
                    }}>{user.username}</span>{messagesStr.user_role}</span>}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="取消" onClick={this.handleCancel}>{cancelText}</Button>,
                    <Button key="保存" type="primary" loading={addLoading} onClick={this.handleOk}>
                        {submitText}
                    </Button>,
                ]}
            >
                <CheckBoxGradio pageName={messagesStr.select_role} upmsRoles={upmsRoles} upmsUserRoles={upmsUserRoles}
                                onChange={this.onChange}/>

            </Modal>
        );
    }

}

const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};


export default connect(mapStateToPorps)(Form.create({})(UpdateUserRole));