/**
 * @fileName: SelectResource.jsx
 * Created on 2018-02-03
 * 下拉框--选择权限
 */
import React from "react";
import {Select} from "antd";

const Option = Select.Option;

export default class SelectResource extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    handleChange = (value) => {
        const { handleChange } = this.props;
        if (typeof handleChange === "function") {
            handleChange(value);
        }
    };

    getSelectTable = () => {
        const { selectable = [] } = this.props;
        let selectView = [];
        selectable.map((data, index) => {
            selectView.push(<Option key={index} value={index}>{data}</Option>)
        });

        return selectView;
    };

    render() {
        let selectable = this.getSelectTable();
        const { selectString = "", valueSelect = 0 } = this.props;
        return (
            <Select
                showSearch
                style={{ width: 120, marginLeft: 5 }}
                placeholder={selectString}
                optionFilterProp="children"
                value={valueSelect}
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {selectable}
            </Select>
        );
    }

}