/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Badge, Icon, Layout, Menu, Dropdown, message} from 'antd';
import {gitOauthInfo, gitOauthToken} from '../axios';
import {queryString} from '../utils';
import avater from '../style/imgs/b1.jpg';
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

    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.router.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
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

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme">

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
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像"/><i
                        className="on bottom b-white"/></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                    ,.ant-dropdown-menu{
                        width: 120px;
                    }
                    .custom-theme {
                        background: #447ED9 !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu {
                        background: #447ED9 !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu-item-group-title {
                        color: #fff !important;
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
