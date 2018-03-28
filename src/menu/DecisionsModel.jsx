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
                enTitle: "Air Trend",
                menuId: 1,
                icon: "hdd",
                menu: "/app/airdata",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/airdata/realdataair",
                        enTitle: "Real-Time Data",
                        title: "实时数据"

                    }, {
                        subId: 2,
                        path: "/app/airdata/statisticalairdata",
                        enTitle: "Statistical Data",
                        title: "统计数据"
                    }
                ]
            },
            {
                menuId: 2,
                menu: "/app/device",
                enTitle: "Equipment Analysis",
                title: "设备分析",
                icon: "car",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/device/realdevicedata",
                        enTitle: "Real-Time Data",
                        title: "实时数据"
                    }, {
                        subId: 2,
                        path: "/app/device/historydata",
                        enTitle: "Historical Data",
                        title: "历史数据"
                    }, {
                        subId: 3,
                        path: "/app/device/devicemanager",
                        enTitle: "Device Management",
                        title: "设备管理"
                    }
                ]
            },
            {
                menuId: 3,
                menu: "/app/manager",
                title: "系统管理",
                enTitle: "System Management",
                icon: "car",
                submenu: [
                    {
                        subId: 1,
                        path: "/app/manager/jurisdictionResource",
                        enTitle: "Authority Resource",
                        title: "权限资源管理"
                    },{
                        subId: 2,
                        path: "/app/manager/childAccountRoleList",
                        enTitle: "Role Management",
                        title: "角色管理"
                    },
                    {
                        subId: 3,
                        path: "/app/manager/usermanager",
                        enTitle: "User Management",
                        title: "用户管理"
                    }, {
                        subId: 4,
                        path: "/app/manager/devicewarning",
                        enTitle: "Device Warning",
                        title: "设备预警"
                    }
                ]
            }
        ]
    };

}

export default DecisionsModel;