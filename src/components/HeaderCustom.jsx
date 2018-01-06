/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Dropdown, Icon, Layout, Menu, message} from 'antd';
import {gitOauthInfo, gitOauthToken} from '../axios';
import {queryString} from '../utils';
import {connect} from 'react-redux';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };

    componentDidMount() {
        const QueryString = queryString();
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };

    logout = () => {
        localStorage.removeItem('user');
        this.props.router.push('/login')
    };

    onClick = function ({ key }) {
        message.info(`Click on item ${key}`);
    };

    menu = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="plan1">平板采集方案1</Menu.Item>
            <Menu.Item key="plan2">平板采集方案2</Menu.Item>
        </Menu>
    );

    menuUser = (
        <Menu onClick={this.logout}>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
    );

    menuLanguage = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="zhLanguage">中文</Menu.Item>
            <Menu.Item key="enLanguage">英文</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Header style={{ background: '#447ED9', padding: 0, height: 65 }} className="custom-theme">

                <Icon
                    className="trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Dropdown overlay={this.menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#"
                       style={{ color: "#fff", fontSize: '14px', padding: '5px', marginLeft: '5px' }}>
                        平板采集方案 <Icon type="caret-down" style={{ color: "#fff" }}/>
                    </a>
                </Dropdown>

                <div style={{ lineHeight: '64px', float: 'right', marginRight: '30px' }}>
                    <Dropdown overlay={this.menuUser}>
                        <a className="ant-dropdown-link" href="javascript:void(0);"
                           style={{ color: "#fff", fontSize: '14px', padding: '5px', marginLeft: '5px' }}>
                            {this.props.user.userName}
                        </a>
                    </Dropdown>
                </div>

                <div style={{ lineHeight: '64px', float: 'right', marginRight: '30px' }}>
                    <Dropdown overlay={this.menuLanguage}>
                        <a className="ant-dropdown-link" href="javascript:void(0);"
                           style={{ color: "#fff", fontSize: '14px', padding: '5px', marginLeft: '5px' }}>
                            中文
                        </a>
                    </Dropdown>
                </div>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                    .ant-dropdown-menu{
                        width: 100px;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = { data: {} } } = state.httpData;
    return { responsive };
};

export default connect(mapStateToProps)(HeaderCustom);
