/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Menu, Button, Checkbox, Form, Icon, Input, Layout, Dropdown, Alert} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {FormattedMessage, injectIntl} from 'react-intl';
import {message} from "antd/lib/index";
import zhCN from "../../locale/zh_CN";
import enUS from "../../locale/en_US";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const FormItem = Form.Item;
const { Footer } = Layout;

class Login extends React.Component {

    state = {
        errorMesg: ""
    };

    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
        const user = JSON.parse(localStorage.getItem('user'));
        const { router } = this.props;
        // if (user != null) {
        //     router.push('/pageIndex/homepage');
        // }
    }

    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { router } = this.props;
        console.log("data====>" + JSON.stringify(nextAuth));
        if (nextAuth.data && nextAuth.data.code === 0) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            router.push('/app/airdata/realdataair');
        } else if (nextAuth.data && nextAuth.data.message !== null) {
            this.setState({
                errorMesg: nextAuth.data.message
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchData } = this.props;
                // if (values.userName === 'admin' && values.password === 'admin') fetchData({
                //     funcName: 'admin',
                //     stateName: 'auth'
                // });
                // if (values.userName === 'guest' && values.password === 'guest') fetchData({
                //     funcName: 'guest',
                //     stateName: 'auth'
                // });

                if (values.userName !== '' && values.password !== '') fetchData({
                    funcName: 'loginWyzk',
                    params: {
                        username: values.userName,
                        password: values.password
                    },
                    stateName: 'auth'
                });
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };

    onClick = ({ key }) => {
        const { receiveData } = this.props;
        receiveData && receiveData(key, 'language');
    };

    menuLanguage = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="zhLanguage">中文</Menu.Item>
            <Menu.Item key="enLanguage">English</Menu.Item>
        </Menu>
    );

    getErrView = () => {
        let msg = this.state.errorMesg || '';
        if (msg === '') {
            return msg;
        }
        return <Alert message={msg} type="error" closable showIcon/>;
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        let { language } = this.props;
        let languageString = language.data === 'zhLanguage' ? '中文' : 'English';
        let messagesStr = language.data === 'zhLanguage' ? zhCN : enUS;
        let errView = this.getErrView();
        return (
            <Layout className="login_layout">

                <div className="wrap">
                    <div style={{ lineHeight: '64px', textAlign: "right", marginRight: '50px' }}>
                        <Dropdown overlay={this.menuLanguage}>
                            <a className="" href="#"
                               style={{
                                   color: "#fff",
                                   fontSize: '14px',
                                   padding: '5px',
                                   marginLeft: '5px'
                               }}>
                                {languageString}
                            </a>
                        </Dropdown>
                    </div>
                    <div className="login">
                        <div className="login-form">
                            <div className="login-logo">
                                <FormattedMessage
                                    id="erpName"
                                    tagName='h2'
                                    defaultMessage={'Air inspection management system'}
                                />
                            </div>
                            {errView}
                            <Form onSubmit={this.handleSubmit} style={{ maxWidth: '400px', marginTop: "10px" }}>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: messagesStr.inputAdmin }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>}
                                               placeholder={messagesStr.inputHitAdmin}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: messagesStr.inputpwd }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password"
                                               placeholder={messagesStr.inputHitpwd}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox> <FormattedMessage
                                            id="remenber"
                                            defaultMessage={'login'}
                                        /></Checkbox>
                                    )}
                                    <a className="login-form-forgot" href="" style={{ float: 'right' }}>
                                        <FormattedMessage
                                            id="forget"
                                            defaultMessage={'forget'}
                                        /></a>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{ width: '100%' }}>
                                        <FormattedMessage
                                            id="login"
                                            defaultMessage={'login'}
                                        />
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <Footer style={{ height: 80, textAlign: 'center', color: '#fff', background: "transparent" }}>
                        V1.0.0 ©2017 Created by wyzk
                    </Footer>
                </div>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                    .ant-dropdown-menu{
                        width: 80px;
                    }
                `}</style>
            </Layout>
        );
    }
}

const mapStateToPorps = state => {
    const { auth, language = 'zhLanguage' } = state.httpData;
    return { auth, language };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(injectIntl(Login)));