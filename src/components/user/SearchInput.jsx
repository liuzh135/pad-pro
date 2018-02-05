/**
 * @fileName: SearchInput.jsx
 * Created on 2018-02-03
 * 查询框
 */
import React from "react";
import {Button, Input} from "antd";
import ReactDOM from "react-dom";

const Search = Input.Search;
export default class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onSearch = (value) => {
        let input = ReactDOM.findDOMNode(this.refs.nameInput);
        let inputValue = input.value;
        const { onInputClick } = this.props;
        if (typeof onInputClick === "function") {
            onInputClick(inputValue);
        }

    };

    render() {
        const { indexName } = this.props;
        return (
            <div className="gutter-example button-demo input-search">
                <span style={{ margin: '0 15px' }}>{indexName}</span>
                <Input
                    ref="nameInput"
                    style={{ width: 200 }}
                    onPressEnter={this.onSearch}
                />
                <Button type="primary" icon="search" onClick={this.onSearch} style={{ margin: '0 15px' }}>查询</Button>
            </div>
        );
    }
}