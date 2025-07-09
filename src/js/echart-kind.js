export const echartsLineShareDatasetChartInit = function echartsLineShareDatasetChartInit(apiData) {
  var $lineShareChartEl = document.querySelector('.echart-line-share-dataset-chart-example');
  if ($lineShareChartEl) {
    // Get options from data attribute
    var userOptions = utils.getData($lineShareChartEl, 'options');
    var chart = window.echarts.init($lineShareChartEl);
    
    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: [utils.getColor('danger'), utils.getColor('info'), utils.getColor('warning'), utils.getColor('secondary'), utils.getColor('success'), utils.getColor('primary')],
        legend: {
          top: 0,
          textStyle: {
            color: utils.getGrays()['700']
          }
        },
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: apiData
        
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: utils.getGrays()['300']
            }
          },
          axisLabel: {
            color: utils.getGrays()['600']
          },
          axisPointer: {
            lineStyle: {
              color: utils.getGrays()['300']
            }
          }
        },
        yAxis: {
          gridIndex: 0,
          axisLabel: {
            color: utils.getGrays()['600']
          },
          splitLine: {
            lineStyle: {
              color: utils.getGrays()['200']
            }
          }
        },
        series: [{
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('danger')
          },
          symbol: 'circle'
        }, {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('info'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('info')
          },
          symbol: 'circle'
        }, {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('warning'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('warning')
          },
          symbol: 'circle'
        }, {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('secondary'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('secondary')
          },
          symbol: 'circle'
        }, {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('success'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('success')
          },
          symbol: 'circle'
        }, {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: {
            focus: 'series'
          },
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays()['100'],
            borderColor: utils.getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('primary')
          },
          symbol: 'circle'
        }, {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '28%'],
          emphasis: {
            focus: 'data'
          },
          label: {
            formatter: '{b}: {@2011} ({d}%)',
            color: utils.getGrays()['600']
          },
          encode: {
            itemName: 'hospitalType',
            value: '2011',
            tooltip: '2011'
          }
        }],
        grid: {
          right: 10,
          left: 5,
          bottom: 5,
          top: '55%',
          containLabel: true
        }
      };
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
    chart.on('updateAxisPointer', function (event) {
      var xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        chart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: "{b}: {@[".concat(dimension, "]} ({d}%)")
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
  }
};

// export const echartsLineShareDatasetChartInit01 = function echartsLineShareDatasetChartInit01(apiData) 
// { 
//   var $lineShareChartEl = document.querySelector('.echart-line-share-dataset-chart-example01');
//   if ($lineShareChartEl) {
//     // Get options from data attribute
//     var userOptions = utils.getData($lineShareChartEl, 'options');
//     var chart = window.echarts.init($lineShareChartEl);
//     var getDefaultOptions = function getDefaultOptions() {
//       return {
//         color: [utils.getColor('danger'), utils.getColor('info'), utils.getColor('warning'), utils.getColor('secondary'), utils.getColor('success'), utils.getColor('primary')],
//         legend: {
//           top: 0,
//           textStyle: {
//             color: utils.getGrays()['700']
//           }
//         },
//         tooltip: {
//           trigger: 'axis',
//           showContent: false
//         },
//         dataset: {
//           source: apiData
//         },
//         xAxis: {
//           type: 'category',
//           axisLine: {
//             lineStyle: {
//               color: utils.getGrays()['300']
//             }
//           },
//           axisLabel: {
//             color: utils.getGrays()['600']
//           },
//           axisPointer: {
//             lineStyle: {
//               color: utils.getGrays()['300']
//             }
//           }
//         },
//         yAxis: {
//           gridIndex: 0,
//           axisLabel: {
//             color: utils.getGrays()['600']
//           },
//           splitLine: {
//             lineStyle: {
//               color: utils.getGrays()['200']
//             }
//           }
//         },
//         series: [{
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('danger'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('danger')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('info'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('info')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('warning'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('warning')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('secondary'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('secondary')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('success'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('success')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'line',
//           smooth: true,
//           seriesLayoutBy: 'row',
//           emphasis: {
//             focus: 'series'
//           },
//           symbolSize: 10,
//           itemStyle: {
//             color: utils.getGrays()['100'],
//             borderColor: utils.getColor('primary'),
//             borderWidth: 2
//           },
//           lineStyle: {
//             color: utils.getColor('primary')
//           },
//           symbol: 'circle'
//         }, {
//           type: 'pie',
//           id: 'pie',
//           radius: '30%',
//           center: ['50%', '28%'],
//           emphasis: {
//             focus: 'data'
//           },
//           label: {
//             formatter: '{b}: {@2016} ({d}%)',
//             color: utils.getGrays()['600']
//           },
//           encode: {
//             itemName: 'hospitalType',
//             value: '2016',
//             tooltip: '2016'
//           }
//         }],
//         grid: {
//           right: 10,
//           left: 5,
//           bottom: 5,
//           top: '55%',
//           containLabel: true
//         }
//       };
//     };
//     echartSetOption(chart, userOptions, getDefaultOptions);
//     // 在标签切换后，调用 resize 更新图表
//     setTimeout(function() {
//       chart.resize();
//     }, 300); // 给图表一些时间来正确渲染
//     chart.on('updateAxisPointer', function (event) {
//       var xAxisInfo = event.axesInfo[0];
//       if (xAxisInfo) {
//         var dimension = xAxisInfo.value + 1;
//         chart.setOption({
//           series: {
//             id: 'pie',
//             label: {
//               formatter: "{b}: {@[".concat(dimension, "]} ({d}%)")
//             },
//             encode: {
//               value: dimension,
//               tooltip: dimension
//             }
//           }
//         });
//       }
//     });
//   }
// };
