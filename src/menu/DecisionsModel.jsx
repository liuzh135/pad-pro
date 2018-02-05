/**
 * @fileName: DecisionsModel.jsx
 * Created on 2017-11-22
 * 配置左侧栏
 *
 * 页面入口管理类
 *
 */
class DecisionsModel {

    //自定义 所有的页面的左侧栏 path
    data = {
        app: [
            {
                title: "空气趋势",
                menuId: 1,
                icon: "hdd",
                menu: "/app/airdata",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/airdata/realdataair",
                        title: "实时数据"
                    }, {
                        subId: 2,
                        path: "/app/airdata/statisticalairdata",
                        title: "统计数据"
                    }
                ]
            },
            {
                menuId: 2,
                menu: "/app/device",
                title: "设备分析",
                icon: "car",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/device/realdevicedata",
                        title: "实时数据"
                    }, {
                        subId: 2,
                        path: "/app/device/historydata",
                        title: "历史数据"
                    }, {
                        subId: 3,
                        path: "/app/device/devicemanager",
                        title: "设备管理"
                    }
                ]
            },
            {
                menuId: 3,
                menu: "/app/manager",
                title: "系统管理",
                icon: "car",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/manager/childAccountRoleList",
                        title: "权限管理"
                    },
                    {
                        subId: 2,
                        path: "/app/manager/usermanager",
                        title: "用户管理"
                    }, {
                        subId: 3,
                        path: "/app/manager/devicewarning",
                        title: "设备预警"
                    }
                ]
            }
        ]
    };

}

export default DecisionsModel;