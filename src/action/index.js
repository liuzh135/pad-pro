/**
 * Created by 叶子 on 2017/7/30.
 */
import * as type from './type';
import * as http from '../axios/index';
import mqttC from 'mqtt';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});

export const mqttData = (data, category) => ({
    type: type.MQTT_DATA,
    data,
    category
});

export const mqttClient = (data, category) => ({
    type: type.MQTT_CLIENT,
    data,
    category
});

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 * @param stateName     state 名称
 */
export const fetchData = ({ funcName, params, stateName }) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

/**
 * MQTT数据调用方法
 * @param category        请求接口的参数
 */
export const mqttConnect = (category) => dispatch => {
    let clientId = 'liuzh-2018-' + Math.random().toString(16).substr(2, 8);//保证Id唯一  不然会出现一致reconnect的问题
    let ptions = {
        keepalive: 10,
        port: 8083,
        host: '120.77.252.48',
        protocol: 'mqtt',
        clientId: clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        transformWsUrl: (url, options, client) => {
            return url + "mqtt";
        },
        rejectUnauthorized: false
    };
    let client = mqttC.connect(ptions);
    console.log("start connect mqtt 1");
    client && client.on('connect', function () {
        console.log("mqtt connect");
        //链接成功  订阅消息
        //client.subscribe('presence');
        //client.publish('presence', 'Hello mqtt');
    });
    //client.subscribe('airmonitordata');
    //接受mqtt消息
    client.on('message', function (topic, message) {
        // message is Buffer
        console.log("topic:" + topic.toString() + "### message:" + message.toString());
        dispatch(mqttData(message.toString(), category));
    });
    return dispatch(mqttClient(client, category));
};