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
            roleJurInfo: [],
            parseRoleList: []

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
                    roleJurInfo: data,
                    parseRoleList: this.parseRoleList([], data),
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    parseRoleList = (tarList = [], roleList = [], perentData, key) => {
        roleList.map((data, index) => {
            if (data.children) {
                tarList.push({
                    id: data.id,
                    parseId: perentData ? (key ? key + data.id : perentData.id + "-" + data.id) : data.id.toString(),
                    checked: data.checked
                });
                perentData ? this.parseRoleList(tarList, data.children, data, (key ? key + data.id + "-" : perentData.id + "-" + data.id + "-")) :
                    this.parseRoleList(tarList, data.children, data)
            } else {
                tarList.push({
                    id: data.id,
                    parseId: key ? key + data.id.toString() : data.id.toString(),
                    checked: data.checked
                });
            }
        });

        return tarList;
    };

    /**
     * 修改角色权限
     */
    handleOk = () => {
        console.log("---修改角色权限---");
        let checkedKeys = this.updateRole;
        //这里是寻求改变的
        let premisslist = this.getPremissList(checkedKeys) || [];

        console.log('getPremissList = ', JSON.stringify(premisslist));
        //提交权限列表
        const { role } = this.props;
        updataRoleByids(role.roleId, premisslist).then((data) => {
            this.setState({ addLoading: false, visible: false });
            if (data.code === 0) {
                this.getRoleInfo(role.roleId);
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


    //只管上报改变的字段就好了  其他不管
    getPremissList = (checkedKeys) => {
        let permissListCheck = [];
        //比较 改变的权限值 然后保存
        let parseRoleList = this.state.parseRoleList;
        parseRoleList.map((data, index) => {
            if (!data.checked) {
                if (this.array_contain(checkedKeys, data.parseId)) {
                    let arr = data.parseId.split("-");
                    if (arr && arr.length > 0) {
                        permissListCheck.push({
                            id: arr[arr.length - 1],
                            checked: true
                        })
                    }
                }

            } else if (data.checked) {//最开始有的  现在没有了就设置false
                if (!this.array_contain(checkedKeys, data.parseId)) {
                    let arr = data.parseId.split("-");
                    if (arr && arr.length > 0) {
                        permissListCheck.push({
                            id: arr[arr.length - 1],
                            checked: false
                        })
                    }
                }
            }
        });
        console.log("------permissListCheck------>" + JSON.stringify(permissListCheck));
        return permissListCheck;
    };

    selectOk = (checkedKeys) => {
        console.log('selectOk--->onCheck = ', checkedKeys);
        this.updateRole = checkedKeys;

    };

    array_contain = (array, obj) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === obj)//如果要求数据类型也一致，这里可使用恒等号===
                return true;
        }
        return false;
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