/**
 * @fileName: SearchInput.jsx
 * Created on 2018-02-03
 * 查询框
 */
import React from "react";
import {Input} from "antd";

export default class InputData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { indexName, refName } = this.props;
        return (
            <div className="gutter-example button-demo flex-center" style={{ padding: '5px', marginTop: '5px' }}>
                <span className="require-red" style={{ margin: '0 15px', flex: '1' }}>{indexName}</span>
                <Input
                    ref={refName}
                    style={{ width: 200, flex: '6' }}
                />

            </div>
        );
    }
}