/**
 * @fileName: SelectJurBase.jsx
 * Created on 2018-02-03
 * 选择权限
 */
import React from "react";
import {Checkbox} from "antd";
import {Tree} from 'antd';

const TreeNode = Tree.TreeNode;
const expandedKeys = [];
const checkedKeys = [];
export default class SelectJurBase extends React.Component {

    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        roleJurList: []
    };


    componentWillMount() {
        const { roleList } = this.props;
        if (roleList !== null) {
            this.setCheckDataView(roleList);
        }
    }

    componentWillReceiveProps(next) {
        let nextRoleList = next.roleList;
        if (nextRoleList !== null) {
            this.setCheckDataView(nextRoleList);
        }
    }

    setexpandKey = (list) => {
        list.map((data, index) => {
            if (data.children) {
                checkedKeys.push(data.name);
                this.setexpandKey(data.children);
            } else {
                expandedKeys.push(data.name);
                checkedKeys.push(data.name)
            }
        })
    };
    setCheckDataView = (list) => {
        this.setexpandKey(list);
        this.setState({
            roleJurList: list,
            checkedKeys: checkedKeys,
            expandedKeys: expandedKeys
        })
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
        const { selectOk } = this.props;
        if (typeof selectOk === "function") {
            selectOk(checkedKeys);
        }
    };
    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
    };
    renderTreeNodes = (data) => {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.name} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            } else {
                return (<TreeNode title={item.name} key={item.name} dataRef={item}/>)
            }
        });
    };
    getRoleJur = () => {
        const { roleJurList } = this.state;
        if (roleJurList !== null && roleJurList.length > 0) {
            return <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(roleJurList)}
            </Tree>
        }
        return "";
    };

    render() {

        let roleView = this.getRoleJur();
        return (
            <div className="gutter-example button-demo" style={{ padding: '5px', margin: '0 15px' }}>
                <div className="role-sty">
                    权限选择
                </div>
                <div className="role-sty-t">
                    {roleView}
                </div>
            </div>
        );
    }

}