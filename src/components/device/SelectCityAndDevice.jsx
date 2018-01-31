import React from "react";
import {message, Button, Dropdown, Icon, Menu, Cascader} from "antd";
import {getCityList, getDeivceList, getProvinceList} from "../../axios";

export default class SelectCityAndDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mac: '',
            address: '',
            deviceId: 0,
            date: this.getLocDate(),
            devicelist: [],
            pagination: {},
            loading: false,
            options: []
        }
    }

    //调用action中的ajax方法，获取数据
    componentWillMount() {
        this.getDevices({
            rows: 10,
            page: 1
        });
        this.getProvinceList();
    }

    isArray = (o) => {
        return Object.prototype.toString.call(o) === "[object Array]";
    };

    getProvinceList = () => {
        getProvinceList().then(data => {
            if (data != null && data.data.length > 1) {
                console.log("data =>" + data.data);
                let optionsTemp = [];
                if (this.isArray(data.data)) {
                    data.data.map((data, index) => {
                        optionsTemp.push({
                            value: data,
                            label: data,
                            isLeaf: false,
                        });
                    });
                }
                this.setState({
                    options: optionsTemp,
                });
            }
        }).catch(err => {
            console.log(err)
        });
    };

    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        getCityList(targetOption.value).then(data => {
            if (data != null && data.data != null) {
                targetOption.loading = false;
                targetOption.children = [];
                if (this.isArray(data.data)) {
                    data.data.map((data, index) => {
                        targetOption.children.push({
                            value: data,
                            label: data,
                        });
                    });
                }
                this.setState({
                    options: [...this.state.options],
                });
            } else {
                message.error(data.msg);
                targetOption.loading = false;
                this.setState({
                    options: [...this.state.options],
                });
            }
        }).catch(err => {
            targetOption.loading = false;
            targetOption.children = [];
            this.setState({
                options: [...this.state.options],
            });
        });
    };


    getLocDate = () => {
        let date = new Date();
        let seperator = "-";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return (1900 + date.getYear()) + seperator + month + seperator + strDate;
    };

    GetQueryString = (name) => {
        let url = window.location.href.substr(1);
        if (url.indexOf(name + "=")) {
            let deviecID = url.split(name + "=");
            if (deviecID.length === 2) {
                return deviecID[1];
            }
        }
        return null;
    };


    //选择设备  重新拉取线表数据
    handleMenuClick = (e) => {
        this.setState({
            mac: this.state.devicelist[e.key].deviceName,
        });
        this.pushSelectDeivceId(this.state.devicelist[e.key].deviceId);
    };

    pushSelectDeivceId = (deviceId) => {
        const { selectDevice } = this.props;
        if (selectDevice != null && typeof selectDevice === "function") {
            selectDevice(deviceId);
        }
    };

    getMenuJon() {
        let menus = [];
        this.state.devicelist.map((data, index) => {
            menus.push(<Menu.Item key={index}>{data.deviceName}</Menu.Item>)
        });
        return <Menu onClick={this.handleMenuClick}>{menus}</Menu>;
    }

    getDevices = (params = {}) => {
        this.setState({ loading: true });
        getDeivceList(params).then(data => {
            if (data.rows != null && data.rows.length > 1) {

                let querydeviceId = this.GetQueryString("deviceId");
                console.log("GetQueryString deviceId =" + querydeviceId);
                let mac = data.rows[0].deviceName;
                let deviceId = data.rows[0].deviceId;
                let address = data.rows[0].address;
                for (let i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].deviceId === parseInt(querydeviceId)) {
                        mac = data.rows[i].deviceName;
                        deviceId = data.rows[i].deviceId;
                        address = data.rows[i].address;
                    }
                }
                this.setState({
                    loading: false,
                    devicelist: data.rows,
                    mac: mac,
                    address: address,
                    deviceId: deviceId,
                    pagination: {
                        total: data.records,
                        pageSize: 10,
                        current: data.page
                    }
                });
                this.pushSelectDeivceId(deviceId);
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        });
    };

    onAddrChange = (value) => {
        console.log(value);
    };

    getOptions = () => {
        return this.state.options;
    };

    render() {
        let menu = this.getMenuJon() || '';
        let mac = this.state.mac;
        let options = this.getOptions();
        let address = this.state.address || '';
        return <div>
            <span className="device_text" style={{ margin: '0 10px' }}>设备位置</span>
            <Cascader
                style={{ width: '250px' }}
                options={options}
                loadData={this.loadData}
                onChange={this.onAddrChange}
                allowClear={false}
                placeholder={address}/>
            <span style={{ margin: '0 10px' }} className="device_text">设备名称</span>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button style={{ margin: 10 }}>
                    {mac} <Icon type="down"/>
                </Button>
            </Dropdown>
        </div>;
    }
}