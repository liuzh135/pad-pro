/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import App from '../App';
import Page from '../components/Page';
import Login from '../components/pages/Login';
import DeviceManager from '../components/device/DeviceManager';
import StatisticalDeviceData from '../components/device/StatisticalDeviceData';
import RealDeviceData from '../components/device/RealDeviceData';
import DeviceWarning from '../components/manager/DeviceWarning';
import UserManager from '../components/manager/UserManager';
// import DeviceRealData from '../components/device/DeviceRealData';
import RealDataAir from '../components/airdata/RealDataAir';
import StatisticalAirData from '../components/airdata/StatisticalAirData';


export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { store } = this.props;
        const { auth } = store.getState().httpData;
        if (!auth || !auth.data.permissions.includes(permission)) hashHistory.replace('/404');
        return component;
    };

    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/login"/>
                    <Route path={'app'} component={App}>

                        <Route path={'device'}>
                            <Route path={'realdevicedata'} component={RealDeviceData}/>
                            <Route path={'historydata'} components={StatisticalDeviceData}/>
                            <Route path={'devicemanager'} components={DeviceManager}/>
                        </Route>
                        <Route path={'airdata'}>
                            <Route path={'realdataair'} component={RealDataAir}/>
                            <Route path={'statisticalairdata'} components={StatisticalAirData}/>

                        </Route>
                        <Route path={'manager'}>
                            <Route path={'usermanager'} component={UserManager}/>
                            <Route path={'devicewarning'} components={DeviceWarning}/>
                        </Route>


                    </Route>
                    <Route path={'login'} components={Login}/>
                </Route>
            </Router>
        )
    }
}