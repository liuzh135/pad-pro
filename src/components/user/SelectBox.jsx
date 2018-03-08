/**
 * @fileName: SelectBox.jsx
 * Created on 2018-02-03
 * 选择权限
 */
import React from "react";
import {Checkbox} from "antd";

const CheckboxGroup = Checkbox.Group;

export default class SelectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList: props.defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        }
    }

    onChange = (checkedList) => {
        let { plainOptions } = this.props;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });

        this.callChangeSelect(checkedList);
    };

    onCheckAllChange = (e) => {
        let { plainOptions } = this.props;
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.callChangeSelect(e.target.checked ? plainOptions : []);
    };

    /**
     *  回调到上层 选中项
     */
    callChangeSelect = (checkedList) => {
        const { onChangeSelect, keyIndex } = this.props;
        if (typeof onChangeSelect === "function") {
            onChangeSelect({
                keyIndex: keyIndex,
                checkedList: checkedList
            });
        }
    };

    render() {
        let { plainOptions, checkAll } = this.props;
        return (
            <div className="gutter-example button-demo" style={{ padding: '5px', margin: '0 15px' }}>
                <div className="role-sty">
                    {checkAll}
                </div>
                <div className="role-sty-t">
                    <div style={{ marginTop: '5px' }}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全选
                        </Checkbox>
                    </div>
                    <div style={{ margin: '5px' }}>
                        <CheckboxGroup options={plainOptions} value={this.state.checkedList}
                                       onChange={this.onChange}/>
                    </div>
                </div>
            </div>
        );
    }

}