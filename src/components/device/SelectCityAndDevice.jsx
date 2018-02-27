import React from "react";
import {message, Button, Dropdown, Icon, Menu, Cascader} from "antd";
import {getCityList, getDeivceList, getProvinceList} from "../../axios";
import {BaseComponent} from "../BaseComponent";

export default class SelectCityAndDevice extends BaseComponent {

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
        let querydeviceId = this.GetQueryString("deviceId");
        if (querydeviceId !== null) {
            console.log("--querydeviceId->" + querydeviceId);
            this.getDevices({
                rows: 10,
                page: 1,
            })
        }
        this.getProvinceList(querydeviceId);
    }

    isArray = (o) => {
        return Object.prototype.toString.call(o) === "[object Array]";
    };

    //获取省份列表
    getProvinceList = (querydeviceId) => {
        getProvinceList().then(data => {
            if (data != null && data.data.length > 0) {
                let optionsTemp = [];
                if (this.isArray(data.data)) {
                    data.data.map((data, index) => {
                        let isLeaf = false;
                        optionsTemp.push({
                            value: data,
                            label: data,
                            isLeaf,
                        });
                    });
                    if (data.data !== null && data.data.length > 0) {
                        let provinceName = data.data[0];
                        let cityName = null;
                        if (provinceName !== undefined) {
                            getCityList(provinceName).then((data) => {
                                if (data !== undefined && data.data !== undefined && data.data.length > 0) {
                                    cityName = data.data[0];
                                }
                                if (!querydeviceId) {
                                    this.getDevices({
                                        rows: 10,
                                        page: 1,
                                        provinceName: provinceName,
                                        cityName: cityName,
                                    });
                                    this.setBaseState({
                                        address: this.getCityNameString(provinceName, cityName)
                                    });
                                }

                                this.pushSelectAddress({
                                    provinceName: provinceName,
                                    cityName: cityName,
                                });

                            }).catch(err => {
                                console.log(err);
                                this.pushSelectAddress({
                                    provinceName: provinceName,
                                    cityName: cityName,
                                });

                                if (!querydeviceId) {
                                    this.getDevices({
                                        rows: 10,
                                        page: 1,
                                        provinceName: provinceName,
                                        cityName: cityName,
                                    });
                                    this.setBaseState({
                                        address: this.getCityNameString(provinceName, cityName)
                                    });
                                }
                            });
                        }
                    }
                }
                this.setBaseState({
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
                this.setBaseState({
                    options: [...this.state.options],
                });
            } else {
                message.error(data.msg);
                targetOption.loading = false;
                this.setBaseState({
                    options: [...this.state.options],
                });
            }
        }).catch(err => {
            targetOption.loading = false;
            targetOption.children = [];
            this.setBaseState({
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
        this.setBaseState({
            mac: this.state.devicelist[e.key].deviceName,
        });
        this.pushSelectDeivceId(this.state.devicelist[e.key].deviceId, this.state.devicelist[e.key]);
    };

    pushSelectDeivceId = (deviceId, device) => {
        const { selectDevice } = this.props;
        if (selectDevice != null && typeof selectDevice === "function") {
            selectDevice(deviceId, device);
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
        const { showDevice } = this.props;
        if (showDevice) {
            this.setBaseState({ loading: true });
            getDeivceList(params).then(data => {
                if (data.rows != null && data.rows.length > 0) {

                    let querydeviceId = this.GetQueryString("deviceId");
                    if (params.isChangeTab) {//点击tab选择的时候  不需要去匹配这个url中的deviceId
                        querydeviceId = null;
                    }
                    console.log("GetQueryString deviceId =" + querydeviceId);
                    let mac = data.rows[0].deviceName;
                    let deviceId = data.rows[0].deviceId;
                    let address = data.rows[0].address;
                    let device = data.rows[0];
                    let isSearch = false;
                    for (let i = 0; i < data.rows.length; i++) {
                        if (data.rows[i].deviceId === parseInt(querydeviceId)) {
                            mac = data.rows[i].deviceName;
                            deviceId = data.rows[i].deviceId;
                            address = data.rows[i].address;
                            device = data.rows[i];
                            isSearch = true;
                        }
                    }

                    if (!isSearch && querydeviceId != null) {
                        console.log("设备不再当前列表,列表id: " + params.page);
                        console.log("请求下一个列表");
                        this.getDevices({
                            rows: 10,
                            page: params.page + 1
                        });
                    } else {
                        this.setBaseState({
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
                        this.pushSelectDeivceId(deviceId, device);
                    }
                }
            }).catch(err => {
                this.setBaseState({
                    loading: false
                });
                console.log(err)
            });
        }
    };

    //返回选择的地址
    pushSelectAddress = (addr) => {
        const { selectCity } = this.props;
        if (selectCity != null && typeof selectCity === "function") {
            selectCity(addr);
        }
    };

    onAddrChange = (value = []) => {
        console.log(value);
        let provinceName = value[0];
        let cityName = value[1];
        this.pushSelectAddress({
            provinceName: provinceName,
            cityName: cityName,
        });

        this.getDevices({
            rows: 10,
            page: 1,
            provinceName: provinceName,
            cityName: cityName,
            isChangeTab: true
        });
    };

    getOptions = () => {
        return this.state.options;
    };

    // Just show the latest item.
    displayRender = (label) => {
        let cityName = label[label.length - 1] ? label[label.length - 1] : "";
        let proName = label[label.length - 2] ? label[label.length - 2] : "";
        return this.getCityNameString(proName, cityName);
    };

    getCityNameString = (proName, cityName) => {
        return proName + (proName && cityName ? "-" : "") + cityName;
    };

    getDeviceView = () => {
        let menu = this.getMenuJon() || '';
        let mac = this.state.mac;
        return <span>
            <span style={{ margin: '0 10px' }} className="device_text">设备名称</span>
            <Dropdown overlay={menu} trigger={['click']}>
                <Button style={{ margin: 10 }}>
                    {mac} <Icon type="down"/>
                </Button>
            </Dropdown>
        </span>
    };

    render() {

        let options = this.getOptions();
        let address = this.state.address || '';
        const { showDevice } = this.props;
        return <div>
            <span className="device_text" style={{ margin: '0 10px' }}>设备位置</span>
            <Cascader
                style={{ width: '250px' }}
                options={options}
                loadData={this.loadData}
                onChange={this.onAddrChange}
                displayRender={this.displayRender}
                allowClear={false}
                placeholder={address}/>
            {showDevice && this.getDeviceView()}
        </div>;
    }
}