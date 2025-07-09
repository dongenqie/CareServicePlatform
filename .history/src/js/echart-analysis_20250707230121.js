//src/js/echart-analysis.js
/* -------------------------------------------------------------------------- */
/*                        研究员-数据统计与分析-描述性分析                       */
/* -------------------------------------------------------------------------- */
var descriptiveChartInit = function descriptiveChartInit() {
  var data = {
    dates: utils.getDates(new Date('5-6-2019'), new Date('5-6-2021'), 1000 * 60 * 60 * 24 * 30),
    dataset: {
      descriptive: [[645, 500, 550, 550, 473, 405, 286, 601], 
      [440, 250, 270, 400, 175, 180, 200, 400],
      [340, 360, 230, 250, 410, 430, 450, 200]],
    }
  };
  var tooltipFormatter = function tooltipFormatter(params) {
    return "\n    <div class=\"card\">\n      <div class=\"card-header bg-body-tertiary py-2\">\n        <h6 class=\"text-600 mb-0\">".concat(params[0].axisValue, "</h6>\n      </div>\n      <div class=\"card-body py-2\">\n        <h6 class=\"text-600 fw-normal\">\n          <span class=\"fas fa-circle text-primary me-2\"></span>总成本: \n          <span class=\"fw-medium\">$").concat(params[0].data, "</span></h6>\n        <h6 class=\"text-600 mb-0 fw-normal\"> \n          <span class=\"fas fa-circle text-warning me-2\"></span>医药费: \n          <span class=\"fw-medium\">$").concat(params[1].data, "</span></h6>\n        <h6 class=\"text-600 mb-0 fw-normal\"> \n          <span class=\"fas fa-circle text-success me-2\"></span>检查费: \n          <span class=\"fw-medium\">$").concat(params[2].data, "</span></h6>\n      </div>\n    </div>\n  ");
  };
  var getDefaultOptions = function getDefaultOptions(histogramData, curveData) {
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
          data: histogramData.xaxis,
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
          name: histogramData.name,
          data: histogramData.yaxis,
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
          smooth:true,
          name: curveData.name,
          data: curveData.curveY,
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
  var chartKeys = ['descriptive'];
  chartKeys.forEach(function (key) {
    var el = document.querySelector(".echart-analysis-".concat(key));
    el && initChart(el, getDefaultOptions(histogramData, curveData));
  });
};

/* -------------------------------------------------------------------------- */
/*                        研究员-数据统计与分析-相关性分析                       */
/* -------------------------------------------------------------------------- */

// 确保使用 export 导出函数
export const correlationChartInit = function correlationChartInit(scatterData) {
  var $basicScatterChartEl = document.querySelector('.echart-analysis-correlation');
  if ($basicScatterChartEl) {
    var chart = window.echarts.init($basicScatterChartEl);

    // 获取散点图的数据（从外部传入）
    var data = scatterData;

    var options = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: {
          color: utils.getGrays()['1100']
        },
        borderWidth: 1,
        transitionDuration: 0
      },
      xAxis: {
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        }
      },
      yAxis: {
        axisLabel: {
          color: utils.getGrays()['600']
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        }
      },
      series: [{
        data: data,  // 使用传入的 scatterData
        type: 'scatter',
        itemStyle: {
          color: utils.getColor('danger')
        }
      }],
      grid: {
        right: 8,
        left: 5,
        bottom: 5,
        top: 8,
        containLabel: true
      }
    };

    // 设置图表选项
    chart.setOption(options);
  }
};

/* -------------------------------------------------------------------------- */
/*                      研究员-数据统计与分析-趋势分析                           */
/* -------------------------------------------------------------------------- */

var echartsScatterQuartetChartInit = function echartsScatterQuartetChartInit() {
  var $scatterQuartetChartEl = document.querySelector('.echart-scatter-quartet-chart-example');
  if ($scatterQuartetChartEl) {
    // Get options from data attribute
    var userOptions = utils.getData($scatterQuartetChartEl, 'options');
    var chart = window.echarts.init($scatterQuartetChartEl);
    var dataAll = [[[10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68]], [[10.0, 9.14], [8.0, 8.14], [13.0, 8.74], [9.0, 8.77], [11.0, 9.26], [14.0, 8.1], [6.0, 6.13], [4.0, 3.1], [12.0, 9.13], [7.0, 7.26], [5.0, 4.74]], [[10.0, 7.46], [8.0, 6.77], [13.0, 12.74], [9.0, 7.11], [11.0, 7.81], [14.0, 8.84], [6.0, 6.08], [4.0, 5.39], [12.0, 8.15], [7.0, 6.42], [5.0, 5.73]], [[8.0, 6.58], [8.0, 5.76], [8.0, 7.71], [8.0, 8.84], [8.0, 8.47], [8.0, 7.04], [8.0, 5.25], [19.0, 12.5], [8.0, 5.56], [8.0, 7.91], [8.0, 6.89]]];
    var xAxis = function xAxis() {
      return {
        axisLabel: {
          color: utils.getGrays()['600']
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        }
      };
    };
    var yAxis = function yAxis() {
      return {
        axisLabel: {
          color: utils.getGrays()['600']
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: utils.getGrays()['300']
          }
        }
      };
    };
    var markLineOpt = {
      animation: false,
      label: {
        formatter: 'y = 0.5 * x + 3',
        align: 'right',
        color: utils.getGrays()['600'],
        fontWeight: 600
      },
      lineStyle: {
        type: 'solid'
      },
      tooltip: {
        formatter: 'y = 0.5 * x + 3'
      },
      data: [[{
        coord: [0, 3],
        symbol: 'none'
      }, {
        coord: [20, 13],
        symbol: 'none'
      }]]
    };
    var gridMdUp = [{
      left: '7%',
      top: '10%',
      width: '38%',
      height: '38%'
    }, {
      right: '7%',
      top: '10%',
      width: '38%',
      height: '38%'
    }, {
      left: '7%',
      bottom: '7%',
      width: '38%',
      height: '38%'
    }, {
      right: '7%',
      bottom: '7%',
      width: '38%',
      height: '38%'
    }];
    var gridMdDown = [{
      left: 6,
      right: 7,
      top: '4%',
      height: '20%'
    }, {
      left: 6,
      right: 7,
      top: '29%',
      height: '20%'
    }, {
      left: 6,
      right: 7,
      bottom: '26%',
      height: '20%'
    }, {
      left: 6,
      right: 7,
      bottom: 25,
      height: '20%'
    }];
    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: [utils.getColor('primary'), utils.getColor('success'), utils.getColor('warning'), utils.getColor('danger')],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'none'
          },
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getGrays()['1100']
          },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: 'Group {a}: ({c})'
        },
        title: {
          text: "Anscombe's quartet",
          left: 'center',
          top: 0,
          textStyle: {
            color: utils.getGrays()['600']
          }
        },
        grid: window.innerWidth < 768 ? gridMdDown : gridMdUp,
        xAxis: [_objectSpread({
          gridIndex: 0,
          min: 0,
          max: 20
        }, xAxis()), _objectSpread({
          gridIndex: 1,
          min: 0,
          max: 20
        }, xAxis()), _objectSpread({
          gridIndex: 2,
          min: 0,
          max: 20
        }, xAxis()), _objectSpread({
          gridIndex: 3,
          min: 0,
          max: 20
        }, xAxis())],
        yAxis: [_objectSpread({
          gridIndex: 0,
          min: 0,
          max: 15
        }, yAxis()), _objectSpread({
          gridIndex: 1,
          min: 0,
          max: 15
        }, yAxis()), _objectSpread({
          gridIndex: 2,
          min: 0,
          max: 15
        }, yAxis()), _objectSpread({
          gridIndex: 3,
          min: 0,
          max: 15
        }, yAxis())],
        series: [{
          name: 'I',
          type: 'scatter',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: dataAll[0],
          markLine: markLineOpt
        }, {
          name: 'II',
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: dataAll[1],
          markLine: markLineOpt
        }, {
          name: 'III',
          type: 'scatter',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: dataAll[2],
          markLine: markLineOpt
        }, {
          name: 'IV',
          type: 'scatter',
          xAxisIndex: 3,
          yAxisIndex: 3,
          data: dataAll[3],
          markLine: markLineOpt
        }]
      };
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
    utils.resize(function () {
      if (window.innerWidth < 768) {
        chart.setOption({
          grid: gridMdDown
        });
      } else {
        chart.setOption({
          grid: gridMdUp
        });
      }
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(descriptiveChartInit);
docReady(correlationChartInit);
