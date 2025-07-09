////src/js/echart-display.js
/* -------------------------------------------------------------------------- */
/*                        数据展示-医疗费用总成本                               */
/* -------------------------------------------------------------------------- */
//医疗费用医院总成本曲线图
export const linePaymentChartInit = function linePaymentChartInit(data, selectedLevel) {
  var $echartsLinePaymentChart = document.querySelector('.echart-line-payment');

  // 检查数据是否有效
  if (!data || !data.dataset) {
    console.error("数据未正确加载，无法渲染图表");
    return;  // 如果数据为空或无效，则停止渲染
  }
  
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
    var dataset = data.dataset;  // 获取从API传递的数据
    var labels = data.labels;  // 获取年份标签
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
          data: dataset[selectedLevel].map(function(d) {
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
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(linePaymentChartInit);