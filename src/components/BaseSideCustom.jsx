/**
 * @fileName: BaseSideCustom.jsx
 * Created on 2017-11-22
 * 默认左边栏样式
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router';
import {connect} from "react-redux";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class BaseSideCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            mode: 'inline',
            openKey: "",
            selectedKey: '',
            firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        };
        this.menu = [];
    }

    componentDidMount() {
        this.setMenuOpen(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }

    setMenuOpen = props => {
        const { path } = props;
        this.setState({
            // openKey: [path.substr(0, path.lastIndexOf('/'))],
            openKey: ['/app/airdata', '/app/device', '/app/manager'],
            selectedKey: path
        });
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            // openKey: v[v.length - 1],
            openKey: ['/app/airdata', '/app/device', "/app/manager"],
            firstHide: false,
        })
    };

    createMenu = v => {
        let submenu = [];
        let { language } = this.props;

        this.menu = [];
        if (v != null) {
            for (let index in v) {
                let menuitem = v[index];
                let icon = menuitem.icon || "book";

                if (menuitem.submenu != null) {
                    submenu = menuitem.submenu;
                    let submenuView = [];
                    for (let suni in submenu) {
                        let subItem = submenu[suni];
                        submenuView.push(<Menu.Item key={subItem.path}><Link
                            to={subItem.path}>{language.data === 'zhLanguage' ?subItem.title:subItem.enTitle}</Link></Menu.Item>);
                    }
                    this.menu.push(<SubMenu
                        key={menuitem.menu}
                        title={<span><Icon type={icon}/><span className="nav-text">{language.data === 'zhLanguage' ?menuitem.title:menuitem.enTitle}</span></span>}
                    >{submenuView}</SubMenu>);
                } else {
                    this.menu.push(<Menu.Item key={menuitem.menu}>
                        <Link to={menuitem.menu}><Icon type={icon}/><span
                            className="nav-text">{language.data === 'zhLanguage' ?menuitem.title:menuitem.enTitle}</span></Link>
                    </Menu.Item>);
                }
            }
        }
        return this.menu;
    };

    render() {
        const { menus } = this.props;
        let baseMenuView = this.createMenu(menus);
        return (
            <Sider
                trigger={null}
                breakpoint="xl"
                width={220}
                collapsed={this.props.collapsed}
                style={{
                    overflowY: 'auto',
                    background: "#ffffff",
                }}
            >
                {/*<div className="logo"/>*/}
                <Menu
                    onClick={this.menuClick}
                    mode="inline"
                    theme="light"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : this.state.openKey}
                    onOpenChange={this.openMenu}
                    style={{fontSize:''}}>
                    {baseMenuView}
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = { data: {} }, language = 'zhLanguage' } = state.httpData;
    return { responsive, language };
};


export default connect(mapStateToProps)(BaseSideCustom);

