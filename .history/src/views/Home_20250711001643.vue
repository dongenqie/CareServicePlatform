<script>
// export default {
//   name: 'Home',
//   methods: {
//     goToLogin() {
//       this.$router.push({ name: 'Login' })  // 跳转到 Login 页
//     }
//   }
// }

    import chinaJson from '@/json/China.json' // 这个是中国地图json 
    import 'echarts-gl'

    export default {
    name: 'Home',
    data() {
        return {
            chinaMapData: [{
                    name: '东北',
                    value: this.randomValue(),

                },
                {
                    name: '华北',
                    value: this.randomValue()
                },
                {
                    name: '西北',
                    value: this.randomValue()
                },
                {
                    name: '西南',
                    value: this.randomValue()
                },
                {
                    name: '华中',
                    value: this.randomValue()
                },
                {
                    name: '华南',
                    value: this.randomValue()
                },
                {
                    name: '华东',
                    value: this.randomValue()
                }
            ],
            chinaDaquGeo: {}
        }
    },
    methods: {
        goToLogin() {
          this.$router.push({ name: 'Login' })  // 跳转到 Login 页
        },
        progressFormat(percentage) {
            return ""
        },
        randomValue() {
            return Math.round(Math.random() * 1000);
        },
        drawChinaMap(id) {
            this.mapCharts = echarts.init(document.getElementById(id));
            var option = {
                tooltip: {
                    // show:false
                    // formatter: function(params, ticket, callback) {
                    //     return params.seriesName + '<br />' + params.name + '：' + params.value
                    // } //数据格式化
                },
                // visualMap使用了不能单独对板块设置颜色 （geo-> regions -> itemStyle -> areaColor ）
                visualMap: {
                    min: 0,
                    max: 1500,
                    left: 'left',
                    top: 'bottom',
                    type: "piecewise",
                    //text: ['高','低'],//取值范围的文字
                    inRange: {
                        color: ['#e0ffff', '#006edd'] //取值范围的颜色
                    },
                    show: true //图注
                },
                // geo: {
                //     map: 'china',
                //     roam: true, //不开启缩放和平移
                //     zoom: 1, //视角缩放比例
                //     center: [108.5525, 34.3227],
                //     label: {
                //         normal: {
                //             show: true,
                //             fontSize: '18',

                //             color: 'rgba(0,0,0,0.7)'
                //         }
                //     },
                //     regions: [{ // 可对单个地图区域进行设置
                //         name: '华北', // 所对应的地图区域的名称
                //         //regionHeight: '',            // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                //         itemStyle: { // 单个区域的样式设置
                //             color: '#00FF00',
                //             opacity: 1,
                //             borderWidth: 0.4,
                //             areaColor: '#5F9EA0'
                //         },
                //         emphasis: { // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式) 
                //             label: { // label高亮时的配置
                //                 show: true,
                //                 textStyle: {
                //                     color: '#fff   ', // 高亮时标签颜色变为 白色
                //                     fontSize: 15, // 高亮时标签字体 变大
                //                 }
                //             },
                //             itemStyle: { // itemStyle高亮时的配置
                //                 areaColor: '#5F9EA0', // 高亮时地图板块颜色改变
                //             }
                //         },
                //     }, {
                //         name: '西南',
                //         itemStyle: {
                //                 areaColor: 'red',
                //                 color: 'red',
                //                  borderColor:'red'
                //             },
                //         emphasis: { // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式) 
                //             label: { // label高亮时的配置
                //                 show: true,
                //                 textStyle: {
                //                     color: '#fff   ', // 高亮时标签颜色变为 白色
                //                     fontSize: 15, // 高亮时标签字体 变大
                //                 }
                //             },
                //             itemStyle: { // itemStyle高亮时的配置
                //                 areaColor: '#F3B329', // 高亮时地图板块颜色改变
                //             }
                //         },
                //     }],
                //     itemStyle: {
                //         normal: {
                //             borderColor: 'rgba(0, 0, 0, 0.2)'
                //         },
                //         emphasis: {
                //             areaColor: '#F3B329', //鼠标选择区域颜色
                //             shadowOffsetX: 0,
                //             shadowOffsetY: 0,
                //             shadowBlur: 20,
                //             borderWidth: 0,
                //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                //         }
                //     }
                // },
                geo: [{
                                            map: 'china',
                                            zlevel:5,
                                            label: {
                                                show: true,
                                                color: '#eee'
                                            },
                                            itemStyle: {
                                                color: '#2075B8', // 背景
                                                borderWidth: '1', // 边框宽度
                                                borderColor: '#fff', // 边框颜色
                                            }
                                        },
                                        {
                                            map: 'china',
                                            top:'11%',
                                            zlevel:4,
                                            itemStyle: {
                                                color: '#3C5FA1', // 背景
                                                borderWidth: '1', // 边框宽度
                                                borderColor: '#3C5FA1', // 边框颜色
                                            }
                                        },
                                        {
                                            map: 'china',
                                            top:'12%',
                                            zlevel:3,
                                            itemStyle: {
                                                color: '#163F6C', // 背景
                                                borderWidth: '1', // 边框宽度
                                                borderColor: '#163F6C', // 边框颜色
                                            }
                                        },
                                        {
                                            map: 'china',
                                            top:'13%',
                                            zlevel:2,
                                            itemStyle: {
                                                color: '#31A0E6', // 背景
                                                borderWidth: '1', // 边框宽度
                                                borderColor: '#31A0E6', // 边框颜色
                                                shadowColor: '#fff',  // 外部阴影 
                                                shadowBlur:'10'
                                            }
                                        }
                                    ],
                
            
                series: [
                    // {
                    //            type: "scatter",
                    //            roam: false,
                    //            zoom: 1,

                    //            coordinateSystem: "geo",
                    //            data: [[121.221, 23.43, 12]], //散点的数据
                    //            symbol: function (params) {
                    //               return "image://http://47.96.130.88:9000/liughhxcdmsg/temp/xiangmu_1676884761006.png" ;
                    //              // if (params[2] === "0") {
                    //              //   return "image://" + process.env.BASE_URL + "map/1.svg";
                    //              // } else if (params[2] === "1") {
                    //              //   return "image://http://47.96.130.88:9000/liughhxcdmsg/temp/xiangmu_1676884761006.png" ;
                    //              // }
                    //            }, // svg图标
                    //            z: 2,
                    //            symbolSize: [48.63, 40], // symbols图标大小
                    //          },

                    {
                        name: '事业部',
                        type: 'map',
                            // type: 'map3D',
                        geoIndex: 0,
                        data: this.chinaMapData,

                        markPoint: { //图表标注。
                            label: {
                                normal: {
                                    show: true,
                                },
                                emphasis: {
                                    show: true,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(72,150,128,1)'
                                }
                            },
                            data: [{
                                name: "四川移动",
                                coord: [
                                    123.97, 47.33 //坐标，通过百度地图提取
                                ],
                                symbol: 'http://47.96.130.88:9000/liughhxcdmsg/temp/xiangmu_1676884761006.png', // 标注图片地址路径
                                symbolSize: 32,
                                service: '这个是自定义的字段，不是echarts的配置',
                                url: '这个也是自定义的字段，不是echarts的配置'
                            }, {
                                name: "河南电信",
                                coord: [
                                    105.97, 36.33
                                ],
                                symbol: 'http://47.96.130.88:9000/liughhxcdmsg/temp/xiangmu_1676884761006.png', // 标注图片地址路径
                                symbolSize: 32,
                                service: '自定义',
                                url: 'http://www.idcd.com'
                            }, ]
                        }
                    },
                    // 散点图
                    { // 涟漪效果
                        name: 'Top 6',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [{
                                name: "苏尼特左旗",
                                value: [113.653412, 43.854108, 4500]
                            },
                            {
                                name: "二连浩特市",
                                value: [111.97981, 43.652895, 3560]
                            },
                            {
                                name: "阿巴嘎旗",
                                value: [114.970618, 44.022728, 3300]
                            },
                            {
                                name: "苏尼特右旗",
                                value: [112.65539, 42.746662, 2800]
                            },
                            {
                                name: "正镶白旗",
                                value: [115.031423, 42.286807, 2100]
                            },
                            {
                                name: "太仆寺旗",
                                value: [115.28728, 41.895199, 1900]
                            }
                        ],
                        symbolSize: function(val) {
                            return val[2] / 200;
                        },
                        encode: {
                            value: 2
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke', //fill 、stroke
                            color: 'red'
                        },
                        emphasis: {

                            scale: false
                        },
                        label: {
                            position: 'left',
                            // formatter: '{b}',
                            position: 'right',
                            show: true,
                            // formatter:'{b}'
                            formatter: '{b}: {@score}'
                            // formatter: function(params) {
                            //     // console.log(params)
                            //     return `${params.data.name}:${params.data.value[2]}个`
                            // } //数据格式化
                        },
                        hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(230, 10, 10, 1)',
                            color: 'red'
                        },
                        zlevel: 8
                    }

                ]
            };
            this.mapCharts.setOption(option);

            this.mapCharts.on('click', params => {
                console.log(params)
                let clickRegionCode = params.data.cityCode;
                // this.getGeoJson(clickRegionCode)
                //     .then(regionGeoJson => this.initEcharts(regionGeoJson.data, params.data.cityCode))
                //     .catch(err => {
                //         this.getGeoJson('440000').then(GdGeoJson => this.initEcharts(GdGeoJson.data,
                //             '440000'))
                //     })
            })
            // },

            /*this.mapCharts.on('click', function (params) {
              alert(params.name);
            });*/
        },

        //划分大区
        mergeProvinces(chinaJson, names, properties) { //合并大区里省份的coordinates
            var features = chinaJson.features;
            var polygons = [];
            for (var i = 0; i < names.length; i++) {
                var polygonsCoordinates = [];
                for (var z = 0; z < names[i].length; z++) {
                    for (var j = 0; j < features.length; j++) {

                        if (features[j].properties.name == names[i][z]) {
                            // polygonsCoordinates.push(features[j].geometry.coordinates[k][d]);
                            // if (features[j].geometry.coordinates[0].constructor == String) { //合并coordinates
                            //     for (var l = 0; l < features[j].geometry.coordinates.length; l++) {
                            //         polygonsCoordinates.push(features[j].geometry.coordinates[l]);
                            //     }

                            // } else if (features[j].geometry.coordinates[0].constructor == Array) {
                            for (var k = 0; k < features[j].geometry.coordinates.length; k++) {

                                if (features[j].properties.name == '内蒙古自治区') {
                                    polygonsCoordinates.push(features[j].geometry.coordinates[k]);
                                } else {
                                    for (var d = 0; d < features[j].geometry.coordinates[k].length; d++) {

                                        polygonsCoordinates.push(features[j].geometry.coordinates[k][d]);

                                    }
                                }
                                //         for (var d = 0; d < features[j].geometry.coordinates[k].length; d++) {

                                //                 polygonsCoordinates.push(features[j].geometry.coordinates[k][d]);

                                //         }
                            }
                            // }
                            break;
                        }
                    }
                }
                polygons.push(polygonsCoordinates);
            }

            // 构建新的合并区域
            var features = [];

            for (var a = 0; a < names.length; a++) {
                var feature = {
                    id: features.length.toString(),
                    type: "FeatureCollection",
                    geometry: {
                        type: "Polygon",
                        coordinates: polygons[a]
                    },
                    properties: {
                        name: properties.name[a] || "",
                        childNum: polygons[a].length
                    }
                };
                if (properties.cp[a]) {
                    feature.properties.cp = properties.cp[a];
                }

                // 将新的合并区域添加到地图中
                features.push(feature);
            }
            console.log(polygons)
            this.chinaDaquGeo.type = "FeatureCollection";
            this.chinaDaquGeo.features = features;
        },

        repRegionStrategy() {
            var params = {
                names: [ //把各个大区的省份用二维数组分开
                    ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区'],
                    ["黑龙江省", "吉林省", "辽宁省"],
                    ['山东省', '江苏省', '安徽省', '江西省', '浙江省', '福建省', '上海市', '台湾省'],
                    ['河南省', '湖北省', '湖南省'],
                    ['广东省', '广西壮族自治区', '海南省', '香港特别行政区', '澳门特别行政区'],
                    ['重庆市', '四川省', '云南省', '西藏自治区', '贵州省'],
                    ['陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区']
                ],
                properties: { //自定义大区的名字，要和上面的大区省份一一对应
                    name: ['华北', '东北', '华东', '华中', '华南', '西南', '西北'],
                    cp: [ //经纬度可以自己随意定义
                        [116.24, 40.54],
                        [126.32, 43.50],
                        [121.28, 31.13],
                        [114.20, 30.32],
                        [113.15, 23.08],
                        [104.04, 30.39],
                        [103.49, 36.03]
                    ]
                }
            };
            this.mergeProvinces(chinaJson, params.names, params.properties);
        }
    },
    //调用
    created() {
        this.repRegionStrategy()
        // 注册地图 
        echarts.registerMap('china', this.chinaDaquGeo) // 如果是js引入就不需要这一行了
        
    },
    mounted() {
        // this.repRegionStrategy()
        // // 注册地图
        // this.echarts.registerMap('china', this.chinaDaquGeo) // 如果是js引入就不需要这一行了
        this.$nextTick(function() {
            this.drawChinaMap('chinaMap')
            // this.repRegionStrategy()
            // 注册地图
            // this.echarts.registerMap('china', this.chinaDaquGeo) // 如果是js引入就不需要这一行了
        })
    }
}
</script>

<template>
  <!-- ===============================================--><!--    Main Content--><!-- ===============================================-->
  <main class="main" id="top">
    <nav class="navbar navbar-standard navbar-vibrant navbar-expand-lg fixed-top"  style="background: linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2);">
      <div class="container"><a class="navbar-brand" href=""><span class="text-white dark__text-white">健康大数据研究中心</span></a><button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
          <ul class="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
            <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dashboards">Dashboard</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
                <div class="bg-white dark__bg-1000 rounded-3 py-2"><a class="dropdown-item link-600 fw-medium" href="">Default</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/analytics.html">Analytics</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/crm.html">CRM</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/e-commerce.html">E commerce</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/lms.html">LMS<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="dropdown-item link-600 fw-medium" href="../dashboard/project-management.html">Management</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/saas.html">SaaS</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/support-desk.html">Support desk<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a></div>
              </div>
            </li> -->
            <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="apps">App</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="apps">
                <div class="card navbar-card-app shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="../assets/img/icons/spot-illustrations/authentication-corner.png" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column"><a class="nav-link py-1 link-600 fw-medium" href="../app/calendar.html">Calendar</a><a class="nav-link py-1 link-600 fw-medium" href="../app/chat.html">Chat</a><a class="nav-link py-1 link-600 fw-medium" href="../app/kanban.html">Kanban</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Social</p><a class="nav-link py-1 link-600 fw-medium" href="../app/social/feed.html">Feed</a><a class="nav-link py-1 link-600 fw-medium" href="../app/social/activity-log.html">Activity log</a><a class="nav-link py-1 link-600 fw-medium" href="../app/social/notifications.html">Notifications</a><a class="nav-link py-1 link-600 fw-medium" href="../app/social/followers.html">Followers</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Support Desk</p><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/table-view.html">Table view</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/card-view.html">Card view</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/contacts.html">Contacts</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/contact-details.html">Contact details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/tickets-preview.html">Tickets preview</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/quick-links.html">Quick links</a>
                        </div>
                      </div>
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">E-Learning</p><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-list.html">Course list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-grid.html">Course grid</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-details.html">Course details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/create-a-course.html">Create a course</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/student-overview.html">Student overview</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/trainer-profile.html">Trainer profile</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Events</p><a class="nav-link py-1 link-600 fw-medium" href="../app/events/create-an-event.html">Create an event</a><a class="nav-link py-1 link-600 fw-medium" href="../app/events/event-detail.html">Event detail</a><a class="nav-link py-1 link-600 fw-medium" href="../app/events/event-list.html">Event list</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Email</p><a class="nav-link py-1 link-600 fw-medium" href="../app/email/inbox.html">Inbox</a><a class="nav-link py-1 link-600 fw-medium" href="../app/email/email-detail.html">Email detail</a><a class="nav-link py-1 link-600 fw-medium" href="../app/email/compose.html">Compose</a>
                        </div>
                      </div>
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">E-Commerce</p><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-list.html">Product list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-grid.html">Product grid</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-details.html">Product details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/add-product.html">Add product</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/orders/order-list.html">Order list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/orders/order-details.html">Order details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/customers.html">Customers</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/customer-details.html">Customer details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/shopping-cart.html">Shopping cart</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/checkout.html">Checkout</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/billing.html">Billing</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/invoice.html">Invoice</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="pagess">Pages</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="pagess">
                <div class="card navbar-card-pages shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="../assets/img/icons/spot-illustrations/authentication-corner.png" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Simple Auth</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/logout.html">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/simple/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Card Auth</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/logout.html">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/card/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Split Auth</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/logout.html">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/split/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Layouts</p><a class="nav-link py-1 link-600 fw-medium" href="../demo/navbar-vertical.html">Navbar vertical</a><a class="nav-link py-1 link-600 fw-medium" href="../demo/navbar-top.html">Top nav</a><a class="nav-link py-1 link-600 fw-medium" href="../demo/navbar-double-top.html">Double top<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="../demo/combo-nav.html">Combo nav</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Others</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/starter.html">Starter</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/landing.html">Landing</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">User</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/user/profile.html">Profile</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/user/settings.html">Settings</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Pricing</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/pricing/pricing-default.html">Pricing default</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/pricing/pricing-alt.html">Pricing alt</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Errors</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/errors/404.html">404</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/errors/500.html">500</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Miscellaneous</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/miscellaneous/associations.html">Associations</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/miscellaneous/invite-people.html">Invite people</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/miscellaneous/privacy-policy.html">Privacy policy</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">FAQ</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/faq/faq-basic.html">Faq basic</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/faq/faq-alt.html">Faq alt</a><a class="nav-link py-1 link-600 fw-medium" href="../pages/faq/faq-accordion.html">Faq accordion</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Other Auth</p><a class="nav-link py-1 link-600 fw-medium" href="../pages/authentication/wizard.html">Wizard</a><a class="nav-link py-1 link-600 fw-medium" href="../#authentication-modal" data-bs-toggle="modal">Modal</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="moduless">Modules</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="moduless">
                <div class="card navbar-card-components shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="../assets/img/icons/spot-illustrations/authentication-corner.png" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Components</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/accordion.html">Accordion</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/alerts.html">Alerts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/anchor.html">Anchor</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/animated-icons.html">Animated icons</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/background.html">Background</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/badges.html">Badges</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/bottom-bar.html">Bottom bar<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/breadcrumbs.html">Breadcrumbs</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/buttons.html">Buttons</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/calendar.html">Calendar</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/cards.html">Cards</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/carousel/bootstrap.html">Bootstrap carousel</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-md-4 pt-md-1"><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/carousel/swiper.html">Swiper</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/collapse.html">Collapse</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/cookie-notice.html">Cookie notice</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/countup.html">Countup</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/dropdowns.html">Dropdowns</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/jquery-components.html">Jquery<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/list-group.html">List group</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/modals.html">Modals</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/navs.html">Navs</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/navbar.html">Navbar</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/vertical-navbar.html">Navbar vertical</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/top-navbar.html">Top nav</a></div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-xxl-4 pt-xxl-1"><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/double-top-navbar.html">Double top<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/combo-navbar.html">Combo nav</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/navs-and-tabs/tabs.html">Tabs</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/offcanvas.html">Offcanvas</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pictures/avatar.html">Avatar</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pictures/images.html">Images</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pictures/figures.html">Figures</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pictures/hoverbox.html">Hoverbox</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pictures/lightbox.html">Lightbox</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/progress-bar.html">Progress bar</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/placeholder.html">Placeholder</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/pagination.html">Pagination</a></div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-xxl-4 pt-xxl-1"><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/popovers.html">Popovers</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/scrollspy.html">Scrollspy</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/search.html">Search</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/sortable.html">Sortable</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/spinners.html">Spinners</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/timeline.html">Timeline</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/toasts.html">Toasts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/tooltips.html">Tooltips</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/treeview.html">Treeview</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/typed-text.html">Typed text</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/videos/embed.html">Embed</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/components/videos/plyr.html">Plyr</a></div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Utilities</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/background.html">Background</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/borders.html">Borders</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/clearfix.html">Clearfix</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/colors.html">Colors</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/colored-links.html">Colored links</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/display.html">Display</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/flex.html">Flex</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/float.html">Float</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/focus-ring.html">Focus ring</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/grid.html">Grid</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/icon-link.html">Icon link</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/overlayscrollbar.html">Overlay scrollbar</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/position.html">Position</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/ratio.html">Ratio</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/spacing.html">Spacing</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/sizing.html">Sizing</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/stretched-link.html">Stretched link</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/text-truncation.html">Text truncation</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/typography.html">Typography</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/vertical-align.html">Vertical align</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/vertical-rule.html">Vertical rule</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/utilities/visibility.html">Visibility</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Tables</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/tables/basic-tables.html">Basic tables</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/tables/advance-tables.html">Advance tables</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/tables/bulk-select.html">Bulk select</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Charts</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/chartjs.html">Chartjs</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/d3js.html">D3js<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a>
                          <p class="nav-link text-700 mb-0 fw-bold">ECharts</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/line-charts.html">Line charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/bar-charts.html">Bar charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/candlestick-charts.html">Candlestick charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/geo-map.html">Geo map</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/scatter-charts.html">Scatter charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/pie-charts.html">Pie charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/gauge-charts.html">Gauge charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/radar-charts.html">Radar charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/heatmap-charts.html">Heatmap charts</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/charts/echarts/how-to-use.html">How to use</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Forms</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/form-control.html">Form control</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/input-group.html">Input group</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/select.html">Select</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/checks.html">Checks</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/range.html">Range</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/basic/layout.html">Layout</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/advance-select.html">Advance select</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/date-picker.html">Date picker</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/editor.html">Editor</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/emoji-button.html">Emoji button</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/file-uploader.html">File uploader</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/input-mask.html">Input mask</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/range-slider.html">Range slider</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/advance/rating.html">Rating</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/floating-labels.html">Floating labels</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/wizard.html">Wizard</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/forms/validation.html">Validation</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column pt-xxl-1">
                          <p class="nav-link text-700 mb-0 fw-bold">Icons</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/icons/font-awesome.html">Font awesome</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/icons/bootstrap-icons.html">Bootstrap icons</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/icons/feather.html">Feather</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/icons/material-icons.html">Material icons</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Maps</p><a class="nav-link py-1 link-600 fw-medium" href="../modules/maps/google-map.html">Google map</a><a class="nav-link py-1 link-600 fw-medium" href="../modules/maps/leaflet-map.html">Leaflet map</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="documentations">Documentation</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="documentations">
                <div class="bg-white dark__bg-1000 rounded-3 py-2"><a class="dropdown-item link-600 fw-medium" href="../documentation/getting-started.html">Getting started</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/configuration.html">Configuration</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/styling.html">Styling<span class="badge rounded-pill ms-2 badge-subtle-success">Updated</span></a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/dark-mode.html">Dark mode</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/plugin.html">Plugin</a><a class="dropdown-item link-600 fw-medium" href="../documentation/faq.html">Faq</a><a class="dropdown-item link-600 fw-medium" href="../documentation/gulp.html">Gulp</a><a class="dropdown-item link-600 fw-medium" href="../documentation/design-file.html">Design file</a><a class="dropdown-item link-600 fw-medium" href="../changelog.html">Changelog</a></div>
              </div>
            </li> -->
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item d-flex align-items-center me-2">
              <div class="dropdown theme-control-dropdown landing-drop">
                <a class="nav-link d-flex align-items-center dropdown-toggle fa-icon-wait pe-1 text-white" href="#" role="button" id="themeSwitchDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="d-none d-lg-block"><span class="fas fa-sun" data-theme-dropdown-toggle-icon="light"></span><span class="fas fa-moon" data-theme-dropdown-toggle-icon="dark"></span><span class="fas fa-adjust" data-theme-dropdown-toggle-icon="auto"></span></span><span class="d-lg-none">选择主题</span></a>
                <div class="dropdown-menu dropdown-menu-end dropdown-caret border py-0 mt-1" aria-labelledby="themeSwitchDropdown">
                  <div class="bg-white dark__bg-1000 rounded-2 py-2"><button class="dropdown-item link-600 d-flex align-items-center gap-2" type="button" value="light" data-theme-control="theme"><span class="fas fa-sun"></span>浅色<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item link-600 d-flex align-items-center gap-2" type="button" value="dark" data-theme-control="theme"><span class="fas fa-moon" data-fa-transform=""></span>暗色<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item link-600 d-flex align-items-center gap-2" type="button" value="auto" data-theme-control="theme"><span class="fas fa-adjust" data-fa-transform=""></span>原始<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button></div>
                </div>
              </div>
            </li>
            <li class="nav-item "><a class="nav-link text-white" id="navbarDropdownLogin" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="goToLogin">登录</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- ============================================--><!-- <section> begin ============================-->
    <!--https://www.zkj.com/Public/Uploads/uploadfile/images/20230825/weixintupian_20230825155201.png-->
    <section class="py-0 overflow-hidden" id="banner" data-bs-theme="light">
      <div class="bg-holder" style="background-image:url(https://tse3.mm.bing.net/th/id/OIP.h6S5hYFb-2MBmFutKsHTkAHaEk?w=2160&h=1335&rs=1&pid=ImgDetMain&o=7&rm=3);background-position: center bottom;"></div><!--/.bg-holder-->
      <div class="container">
        <div class="row flex-center pt-8 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-lg-8  mt-4 mt-xl-0">
            <div class="chart-wrapper">
                <div id="chinaMap" style="width: 100%;height: 80vh;"></div>
            </div>
          </div>
          <div class="col-md-11 col-lg-4 col-xl-3 pb-7 pb-xl-9 text-center text-xl-start">
            <h1 class="text-black fw-light"> <span class="typed-text fw-bold" data-typed-text='["医院","人口","医疗资源","机构"]'></span><br /></h1>
            <p class="lead text-primary opacity-75 text-primary">欢迎来到健康大数据研究中心</p><a class="btn btn-outline-light border-2 rounded-pill btn-lg btn-primary mt-4 fs-9 py-2 text-white" @click="goToLogin" >开始吧!<span class="fas fa-play ms-2" data-fa-transform="shrink-6 down-1"></span></a>
          </div>
        </div>
      </div><!-- end of .container-->
    </section><!-- <section> close ============================--><!-- ============================================-->



  </main><!-- ===============================================--><!--    End of Main Content--><!-- ===============================================-->

    <!--右边侧边栏-->
    <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
      <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
        <div class="z-1 py-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>设置</h5><button class="btn btn-primary btn-sm rounded-pill mt-0 mb-0" data-theme-control="reset" style="font-size:12px"> <span class="fas fa-redo-alt me-1" data-fa-transform="shrink-3"></span>Reset</button>
          </div>
          <p class="mb-0 fs-10 text-white opacity-75">设置你喜欢的风格！</p>
        </div>
        <div class="z-1" data-bs-theme="dark">
          <button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
        <h5 class="fs-9">颜色主题</h5>
        <p class="fs-10">请挑选你最喜欢的主题</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-4"><input class="btn-check" id="themeSwitcherLight" name="theme-color" type="radio" value="light" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherLight"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-auto.jpg" alt=""/></span><span class="label-text">Light</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherDark" name="theme-color" type="radio" value="dark" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherDark"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-dark.jpg" alt=""/></span><span class="label-text"> Dark</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherAuto" name="theme-color" type="radio" value="auto" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherAuto"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-default.jpg" alt=""/></span><span class="label-text"> Auto</span></label></div>
          </div>
        </div>
        <hr />
        <h5 class="fs-9 d-flex align-items-center">侧边栏风格</h5>
        <p class="fs-10 mb-0">请挑选你最喜欢的侧边栏风格</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-6"><input class="btn-check" id="navbar-style-transparent" type="radio" name="navbarStyle" value="transparent" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-transparent"> <img class="img-fluid img-prototype" src="../../assets/img/generic/default.png" alt="" /><span class="label-text"> Transparent</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-inverted" type="radio" name="navbarStyle" value="inverted" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-inverted"> <img class="img-fluid img-prototype" src="../../assets/img/generic/inverted.png" alt="" /><span class="label-text"> Inverted</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-card" type="radio" name="navbarStyle" value="card" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-card"> <img class="img-fluid img-prototype" src="../../assets/img/generic/card.png" alt="" /><span class="label-text"> Card</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-vibrant" type="radio" name="navbarStyle" value="vibrant" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-vibrant"> <img class="img-fluid img-prototype" src="../../assets/img/generic/vibrant.png" alt="" /><span class="label-text"> Vibrant</span></label></div>
          </div>
        </div>
      </div>
    </div>
    <a class="card setting-toggle" href="#settings-offcanvas" data-bs-toggle="offcanvas">
      <div class="card-body d-flex align-items-center py-md-2 px-2 py-1">
        <div class="bg-primary-subtle position-relative rounded-start" style="height:34px;width:28px">
          <div class="settings-popover"><span class="ripple"><span class="fa-spin position-absolute all-0 d-flex flex-center"><span class="icon-spin position-absolute all-0 d-flex flex-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path></svg></span></span></span></div>
        </div><small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end">customize</small>
      </div>
    </a>
</template>

<style scoped>
</style>
