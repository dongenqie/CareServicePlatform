////src/js/echart-display.js
/* -------------------------------------------------------------------------- */
/*                        数据展示-医疗费用总成本                               */
/* -------------------------------------------------------------------------- */
//医疗费用医院总成本曲线图
export const linePaymentChartInit = function linePaymentChartInit(data, selectedLevel) {
  var $echartsLinePaymentChart = document.querySelector('.echart-line-payment');



//   var dataset = {
//     total: [1, 0, 2, 1, 2, 1, 1, 5],           //【医院合计】的八年hospitalTotalCost
//     committee: [1, 3, 2, 1, 4, 6, 1, 2],       //【委属】的八年hospitalTotalCost
//     province: [1, 0, 2, 1, 2, 1, 1, 2],        //【省属】的八年hospitalTotalCost
//     prefectureLevel: [1, 2, 4, 1, 2, 1, 1, 3], //【地级市属】的八年hospitalTotalCost
//     countyLevel: [1, 0, 3, 1, 2, 4, 1, 0],     //【县级市属】的八年hospitalTotalCost
//     county: [1, 3, 2, 1, 2, 1, 1, 5],          //【县属】的八年hospitalTotalCost
//     //每行数组第一个数据就是2015年的，第二个就是2016年的，...以此类推第八个就是2022年的
//   };
//   var labels = ['2015年  ', '2016年  ', '2017年  ', '2018年  ', '2019年  ', '2020年  ', '2021年  ', '2022年  '];
  if ($echartsLinePaymentChart) {
    // 检查数据是否有效
    if (!data || !data.dataset) {
        console.error("数据未正确加载，无法渲染图表");
        return;  // 如果数据为空或无效，则停止渲染
    }

    var dataset = data.dataset;  // 获取从API传递的数据
    var labels = data.labels;  // 获取年份标签

    // 确保 selectedLevel 和 dataset[selectedLevel] 是有效的
    if (!dataset[selectedLevel]) {
        console.error(`Level: ${selectedLevel} 的数据未找到`);
        return;
    }

    // 如果 dataset[selectedLevel] 为空，防止 map 报错
    const dataForLevel = dataset[selectedLevel];
    if (!Array.isArray(dataForLevel)) {
        console.error(`数据格式错误，无法使用 map 对 ${selectedLevel} 进行处理`);
        return;
    }

    var chart = window.echarts.init($echartsLinePaymentChart);

    // 配置图表
    var getDefaultOptions = function getDefaultOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          borderWidth: 1,
          transitionDuration: 0,
          formatter: function formatter(params) {
            return `${params[0].axisValue} - ${params[0].value}元`;
          },
          textStyle: {
            fontWeight: 500,
            fontSize: 12,
            color: utils.getGrays()['1100']
          }
        },
        xAxis: {
          type: 'category',
          data: labels,
          splitLine: {
            show: true,
            lineStyle: {
              color: utils.rgbaColor('#fff', 0.1)
            },
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: utils.rgbaColor('#fff', 0.1)
            }
          },
          axisTick: {
            show: true,
            length: 10,
            lineStyle: {
              color: utils.rgbaColor('#fff', 0.1)
            }
          },
          axisLabel: {
            color: utils.getGrays()['400'],
            fontWeight: 600,
            // formatter: function formatter(value) {
            //   return value.substring(0, value.length - 3);
            // },
            fontSize: 12,
            // interval: window.innerWidth < 768 ? 'auto' : 0,
            margin: 15
          },
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          smooth: true,
            data: dataForLevel.map(function(d) {
            return d;  // 根据选择的类别显示不同的数据
            }),
          symbol: 'emptyCircle',
          itemStyle: {
            color: utils.isDark() === 'light' ? utils.getColors().white : utils.getColors().primary
          },
          lineStyle: {
            color: utils.isDark() === 'light' ? utils.rgbaColor(utils.getColors().white, 0.8) : utils.getColors().primary
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: utils.isDark() === 'light' ? 'rgba(255, 255, 255, 0.5)' : utils.rgbaColor(utils.getColors().primary, 0.5)
              }, {
                offset: 1,
                color: utils.isDark() === 'light' ? 'rgba(255, 255, 255, 0)' : utils.rgbaColor(utils.getColors().primary, 0)
              }]
            }
          },
          emphasis: {
            lineStyle: {
              width: 2
            }
          }
        }],
        grid: {
          right: 15,
          left: 15,
          bottom: '15%',
          top: 0
        }
      };
    };
    echartSetOption(chart, null, getDefaultOptions);
    // utils.resize(function () {
    //   if (window.innerWidth < 768) {
    //     chart.setOption({
    //       xAxis: {
    //         axisLabel: {
    //           interval: 'auto'
    //         }
    //       }
    //     });
    //   }
    // });
    var selectMenu = document.querySelector('#dashboard-chart-select');
    if (selectMenu) {
      selectMenu.addEventListener('change', function (e) {
        var value = e.currentTarget.value;
        chart.setOption({
          series: [{
            data: dataset[value].map(function (d) {
              return d;
            })
          }]
        });
      });
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                各类型医疗卫生机构医院总成本、医药费、检查费折线图               */               
/* -------------------------------------------------------------------------- */
//各类型医疗卫生机构医院总成本、医药费、检查费折线图
export const revenueChartInit = function revenueChartInit(dynamicData) {
  // var data = {
  //   dates: utils.getDates(new Date('5-6-2019'), new Date('5-6-2021'), 1000 * 60 * 60 * 24 * 30),
  //   dataset: {
  //     //委属的八年总成本、医药费、检查费数据，每个小数组第一个数据就是2015年的，第二个就是2016年的，以此类推，第八个就是2022年的
  //     revenue: [[645, 500, 550, 550, 473, 405, 286, 601], //第一行是总成本hospitalTotalCost
  //     [440, 250, 270, 400, 175, 180, 200, 400],           //第二行是医药费medicineFee
  //     [340, 360, 230, 250, 410, 430, 450, 200]],          //第三行是检查费inspectionFee
  //     //省属的八年总成本、医药费、检查费数据
  //     users: [[545, 500, 650, 727, 773, 705, 686, 501], 
  //     [340, 360, 230, 250, 410, 430, 450, 200],
  //     [440, 250, 270, 400, 175, 180, 200, 400]],
  //     //地级市属的八年总成本、医药费、检查费数据
  //     deals: [[545, 400, 450, 627, 473, 450, 460, 780], 
  //     [245, 300, 450, 427, 273, 250, 260, 580],
  //     [340, 360, 330, 300, 410, 380, 450, 400]],
  //     //县级市属的八年总成本、医药费、检查费数据
  //     profit: [[545, 400, 450, 627, 673, 605, 686, 501], 
  //     [340, 360, 330, 300, 410, 380, 450, 400],
  //     [350, 370, 230, 250, 410, 430, 450, 200]],
  //     //县属的八年总成本、医药费、检查费数据
  //     county: [[545, 400, 450, 627, 673, 605, 686, 501], 
  //     [340, 360, 330, 300, 410, 380, 450, 400],
  //     [440, 250, 270, 400, 175, 180, 200, 400]],
  //   }
  // };

  // 1. 把 dynamicData 转成原来静态代码期望的格式：
  var data = {
    dates: dynamicData.labels, // ['2015年', ...]
    dataset: {
      // revenue ↔ 委属； users ↔ 省属； deals ↔ 地级市属； profit ↔ 县级市属； county ↔ 县属
      revenue: [
        dynamicData.details.committee.total,
        dynamicData.details.committee.medicine,
        dynamicData.details.committee.inspection
      ],
      users: [
        dynamicData.details.province.total,
        dynamicData.details.province.medicine,
        dynamicData.details.province.inspection
      ],
      deals: [
        dynamicData.details.prefectureLevel.total,
        dynamicData.details.prefectureLevel.medicine,
        dynamicData.details.prefectureLevel.inspection
      ],
      profit: [
        dynamicData.details.countyLevel.total,
        dynamicData.details.countyLevel.medicine,
        dynamicData.details.countyLevel.inspection
      ],
      county: [
        dynamicData.details.county.total,
        dynamicData.details.county.medicine,
        dynamicData.details.county.inspection
      ]
    }
  };

  var tooltipFormatter = function tooltipFormatter(params) {
    return "\n    <div class=\"card\">\n      <div class=\"card-header bg-body-tertiary py-2\">\n        <h6 class=\"text-600 mb-0\">".concat(params[0].axisValue, "</h6>\n      </div>\n      <div class=\"card-body py-2\">\n        <h6 class=\"text-600 fw-normal\">\n          <span class=\"fas fa-circle text-primary me-2\"></span>总成本: \n          <span class=\"fw-medium\">$").concat(params[0].data, "</span></h6>\n        <h6 class=\"text-600 mb-0 fw-normal\"> \n          <span class=\"fas fa-circle text-warning me-2\"></span>医药费: \n          <span class=\"fw-medium\">$").concat(params[1].data, "</span></h6>\n        <h6 class=\"text-600 mb-0 fw-normal\"> \n          <span class=\"fas fa-circle text-success me-2\"></span>检查费: \n          <span class=\"fw-medium\">$").concat(params[2].data, "</span></h6>\n      </div>\n    </div>\n  ");
  };
  var getDefaultOptions = function getDefaultOptions(data1, data2, data3) {
    return function () {
      return {
        color: utils.getColors().white,
        tooltip: {
          trigger: 'axis',
          padding: 0,
          backgroundColor: 'transparent',
          borderWidth: 0,
          transitionDuration: 0,
          position: function position(pos, params, dom, rect, size) {
            return getPosition(pos, params, dom, rect, size);
          },
          axisPointer: {
            type: 'none'
          },
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',
          // data: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'], 
          data: data.dates,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          boundaryGap: true
        },
        yAxis: {
          position: 'right',
          axisPointer: {
            type: 'none'
          },
          axisTick: 'none',
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          name: '总成本',
          data: data1,
          lineStyle: {
            color: utils.getColor('primary')
          },
          itemStyle: {
            barBorderRadius: [4, 4, 0, 0],
            color: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              color: utils.getColor('primary')
            }
          }
        }, {
          type: 'line',
          name: '医药费',
          data: data2,
          symbol: 'circle',
          symbolSize: 6,
          animation: false,
          itemStyle: {
            color: utils.getColor('warning')
          },
          lineStyle: {
            type: 'dashed',
            width: 2,
            color: utils.getColor('warning')
          }
        }, {
          type: 'line',
          name: '检查费',
          data: data3,
          symbol: 'circle',
          symbolSize: 6,
          animation: false,
          itemStyle: {
            color: utils.getColor('success')
          },
          lineStyle: {
            type: 'dashed',
            width: 2,
            color: utils.getColor('success')
          }
        }],
        grid: {
          right: 5,
          left: 5,
          bottom: '8%',
          top: '5%'
        }
      };
    };
  };
  var initChart = function initChart(el, options) {
    var userOptions = utils.getData(el, 'options');
    var chart = window.echarts.init(el);
    echartSetOption(chart, userOptions, options);
  };
  var chartKeys = ['revenue', 'users', 'deals', 'profit', 'county'];
  // chartKeys.forEach(function (key) {
  //   var el = document.querySelector(".echart-crm-".concat(key));
  //   el && initChart(el, getDefaultOptions(data.dataset[key][0], data.dataset[key][1], data.dataset[key][2]));
  // });
  chartKeys.forEach(function (key) {
    var el = document.querySelector(`.echart-crm-${key}`);
    el && initChart(el, getDefaultOptions(
      data.dataset[key][0],
      data.dataset[key][1],
      data.dataset[key][2]
    ));
  });
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(linePaymentChartInit);
docReady(revenueChartInit);