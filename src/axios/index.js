/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {get} from './tools';
import * as config from './config';
import {message} from "antd/lib/index";

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

//登录模块
export const loginWyzk = (params = {}) => {
    let username = params.username;
    let password = params.password;
    let url = config.BASEWYZK + '/sso/login?username=' + username + '&password=' + password;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => {
        message.error(err.message);
        console.log(err)
    });
};

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

export const getDeivceList = params => {
    let provinceName = params.provinceName;
    let cityName = params.cityName;
    let url = config.BASEWYZK + '/device/device/getDeviceList?page=' + params.page + '&rows=' + params.rows;
    if (provinceName !== undefined && provinceName !== "") {
        url = url + "&provinceName=" + provinceName;
    }
    if (cityName !== undefined && cityName !== "") {
        url = url + "&cityName=" + cityName;
    }
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const getDeviceByCityAndDate = (cityName, date) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/line/getDeviceByCityAndDate?cityName=' + cityName + '&date=' + date
}).then(res => res.data).catch(err => console.log(err));

export const getDeviceByCityAndMonth = (cityName, date) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/line/getDeviceByCityAndMonth?cityName=' + cityName + '&date=' + date
}).then(res => res.data).catch(err => console.log(err));

export const getDeviceDataByCityName = (params) => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/data/getDeviceDataByCityName?cityName=' + params.cityName + '&page=' + params.page + '&rows=' + params.rows
}).then(res => res.data).catch(err => console.log(err));


export const getProvinceList = () => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/common/getProvinceList'
}).then(res => res.data).catch(err => console.log(err));

export const getCityList = provinceName => axios({
    method: 'get',
    url: config.BASEWYZK + '/device/common/getCityList?provinceName=' + provinceName
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

export const getRoleList = params => {
    let search = params.search;
    let sort = params.sort;
    let order = params.order;
    let url = config.BASEWYZK + '/manage/role/list?page=' + params.page + '&rows=' + params.rows;
    if (search !== undefined && search !== "") {
        url = url + "&search=" + search;
    }
    if (sort !== undefined && sort !== "") {
        url = url + "&sort=" + sort;
    }
    if (order !== undefined && order !== "") {
        url = url + "&order=" + order;
    }
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const getUserList = params => {
    let search = params.search;
    let sort = params.sort;
    let order = params.order;
    let url = config.BASEWYZK + '/manage/user/list?page=' + params.page + '&rows=' + params.rows;
    if (search !== undefined && search !== "") {
        url = url + "&search=" + search;
    }
    if (sort !== undefined && sort !== "") {
        url = url + "&sort=" + sort;
    }
    if (order !== undefined && order !== "") {
        url = url + "&order=" + order;
    }
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const getPermissionList = params => {
    let search = params.search;
    let sort = params.sort;
    let order = params.order;
    let url = config.BASEWYZK + '/manage/permission/list?page=' + params.page + '&rows=' + params.rows;
    if (search !== undefined && search !== "") {
        url = url + "&search=" + search;
    }
    if (sort !== undefined && sort !== "") {
        url = url + "&sort=" + sort;
    }
    if (order !== undefined && order !== "") {
        url = url + "&order=" + order;
    }
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const delPermissionList = ids => {
    let url = config.BASEWYZK + '/manage/permission/delete/' + ids;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const delRoleList = ids => {
    let url = config.BASEWYZK + '/manage/role/delete/' + ids;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const createRole = (parm) => {
    // let url = config.BASEWYZK + '/manage/role/create';
    // return axios.post(url, parm).then(res => res.data).catch(err => console.log(err));

    let url = config.BASEWYZK + '/manage/role/create?name=' + parm.name + "&title=" + parm.title + "&description=" + parm.description;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const updateRole = (parm) => {
    let url = config.BASEWYZK + '/manage/role/update/' + parm.roleId + '?name=' + parm.name + "&title=" + parm.title + "&description=" + parm.description;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

//修改用户信息
export const updateUser = (parm) => {
    let url = config.BASEWYZK + '/manage/user/update/' + parm.userId + '?username=' + parm.username
        + "&realname=" + parm.realname + "&phone=" + parm.phone
        + "&email=" + parm.email + "&sex=" + parm.sex + "&locked=" + parm.locked;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const getRoleJurInfo = (roleId) => {
    let url = config.BASEWYZK + '/manage/permission/role/' + roleId;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const getUserRoleInfo = (userId) => {
    let url = config.BASEWYZK + '/manage/user/role/' + userId;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};


export const userCreate = (parm) => {
    let url = config.BASEWYZK + '/manage/user/create?username=' + parm.username
        + "&password=" + parm.password + "&realname=" + parm.realname + "&phone=" + parm.phone + "&email=" + parm.email
        + "&sex=" + parm.sex + "&locked=" + parm.locked;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};

export const delUserByid = (userId) => {
    let url = config.BASEWYZK + '/manage/user/delete/' + userId;
    return axios({
        method: 'get',
        url: url
    }).then(res => res.data).catch(err => console.log(err));
};


// export const updataUserByid = (userId, ids) => {
//     let url = config.BASEWYZK + '/manage/user/role/' + userId;
//     return axios({
//         method: 'post',
//         url: url,
//         data: {
//             roleId: ids
//         }
//     }).then(res => res.data).catch(err => console.log(err));
// };


export const updataUserByid = (userId, ids) => axios.post(config.BASEWYZK + '/manage/user/role/' + userId, {
    roleId: ids,
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});





