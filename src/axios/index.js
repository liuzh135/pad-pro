/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {get} from './tools';
import * as config from './config';

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {
    ...{
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin'
    }, code: code
}, { headers: { Accept: 'application/json' } })
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });

// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

//export const getDeivceList = (params) => axios({
//    method: 'get',
//    url: 'http://192.168.0.101:8080/device/device/getDeviceList?page=' + params.page + "&rows=" + params.rows,
//}).then(res => res.data).catch(err => console.log(err));


//export const getDeivceList = (params) => axios.post('http://192.168.0.101:8080/device/device/getDeviceList', {
//    page: params.page,
//    rows: params.rows
//}).then(function (response) {
//    return response.data;
//}).catch(function (error) {
//    console.log(error);
//});

export const getDeivceList = params => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/device/getDeviceList?page=' + params.page + '&rows=' + params.rows
}).then(res => res.data).catch(err => console.log(err));


export const getDeviceByDate = params => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/line/getDeviceByDate?deviceId=' + params.deviceId + '&date=' + params.date
}).then(res => res.data).catch(err => console.log(err));


export const getDeviceMapList = () => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/device/getDeviceMapList'
}).then(res => res.data).catch(err => console.log(err));

export const getDeviceRealData = (deviceId) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/data/getLastDeviceData?deviceId=' + deviceId
}).then(res => res.data).catch(err => console.log(err));

export const getDeviceByHour = (params) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/line/getDeviceByHour?deviceId=' + params.deviceId + '&date=' + params.date
}).then(res => res.data).catch(err => console.log(err));


export const getDeviceDataHistoryByDeviceId = (params) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/data/getDeviceDataHistoryByDeviceId?deviceId=' + params.deviceId + '&startTime=' + params.startTime
    + '&endTime=' + params.endTime + '&page=' + params.page + '&rows=' + params.rows
}).then(res => res.data).catch(err => console.log(err));





