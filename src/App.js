import React, {Component} from 'react';
import {Layout} from 'antd';
import './style/index.less';
import BaseSideCustom from './components/BaseSideCustom';
import HeaderCustom from './components/HeaderCustom';
import DecisionsModel from './menu/DecisionsModel';
import {mqttConnect, receiveData, mqttData} from '@/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const { Content } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        const { router } = this.props;
        if (user == null) {
            router.push('/');
        }
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }

    componentDidMount() {
        const { mqttConnect } = this.props;
        mqttConnect("connect");
    }

    componentDidUpdate() {
        let patharry = this.props.location.pathname.split("/");
        const { connect } = this.props;
        if (patharry.length > 2 && patharry[3] !== 'realdevicedata'
            && connect != null && connect.client != null) {
            if (connect && connect.mqdata != null) {
                let renderData = JSON.parse(connect.mqdata).data;
                if (renderData != null) {

                    connect.client.unsubscribe("/device/air/airmonitor/" + renderData.uuid);
                    console.log("---unsubscribe-->" + renderData.uuid);
                    const { mqttData } = this.props;
                    mqttData(null, "connect");
                    console.log("---clear data-->");
                }
            }
        }
    }

    componentWillUnmount() {
        console.log("+++++++APP++++componentWillUnmount+++++");
        const { connect } = this.props;
        //接受数据  渲染UI
        if (connect && connect.client != null) {
            connect.client.end();
        }
    }

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        receiveData({ isMobile: clientWidth <= 992 }, 'responsive');
    };
    toggle = () => {
        //收起侧边栏先屏蔽
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
    };

    render() {
        const { auth, router, responsive } = this.props;
        // console.log("auth ---->" + JSON.stringify(auth));
        let de = new DecisionsModel();

        //左侧栏 decision 特殊处理
        let side_view;
        let patharry = this.props.location.pathname.split("/");
        if (patharry.length > 2 && de.data[patharry[1]] != null) {
            side_view = <BaseSideCustom menus={de.data[patharry[1]]} path={this.props.location.pathname}
                                        collapsed={this.state.collapsed}/>;
        }

        return (
            <Layout>

                <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}
                              router={router} path={this.props.location.pathname}/>

                <Layout style={{ height: "100%" }}>
                    {side_view}
                    <Layout>
                        <Content
                            style={{ margin: '0 10px', backgroundColor: '#fff', overflow: 'initial', height: '100%' }}>
                            {this.props.children}
                        </Content>


                    </Layout>

                </Layout>
                {
                    (   // 手机端对滚动很慢的处理
                        <style>
                            {`

                            .ant-card-wider-padding .ant-card-body {
                              padding: 16px 16px;
                            }

                            .ant-card-body {
                              padding: 14px;
                              zoom: 1;
                            }
                        `}
                        </style>
                    )
                }
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { connect = { client: {} }, auth = { data: {} }, responsive = { data: {} } } = state.httpData;
    return { connect, auth, responsive };
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    mqttData: bindActionCreators(mqttData, dispatch),
    mqttConnect: bindActionCreators(mqttConnect, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
