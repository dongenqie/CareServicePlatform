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

export const trendChartInit = function trendChartInit() {
  var $scatterQuartetChartEl = document.querySelector('.echart-analysis-trend');
  if ($scatterQuartetChartEl) {
    // Get options from data attribute
    var userOptions = utils.getData($scatterQuartetChartEl, 'options');
    var chart = window.echarts.init($scatterQuartetChartEl);

    // 该部分需要根据从后端获取的数据更新
    var scatterData = []; // 散点数据
    var trendData = []; // 回归线数据

    // 更新散点数据和回归线数据
    scatterData = initialData.scatterVO.data;
    trendData = [
      { x: 0, y: initialData.trendVO.intercept },
      { x: 20, y: initialData.trendVO.slope * 20 + initialData.trendVO.intercept }
    ];

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

    var gridMdUp = [{
      left: '7%',
      top: '10%',
      width: '87%',
      height: '87%'
    }];
    var gridMdDown = [{
      left: 6,
      right: 7,
      top: '4%',
      height: '20%'
    }];
    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: [utils.getColor('primary'), utils.getColor('success')],
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
          text: "趋势分析",
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
        }, xAxis())],
        yAxis: [_objectSpread({
          gridIndex: 0,
          min: 0,
          max: 15
        }, yAxis())],
        series: [{
          name: '散点图',
          type: 'scatter',
          data: scatterData
        }, {
          name: '回归线',
          type: 'line',
          data: trendData,
          markLine: {
            label: {
              formatter: `y = ${initialData.trendVO.slope} * x + ${initialData.trendVO.intercept}`,
              align: 'right',
              color: utils.getGrays()['600'],
              fontWeight: 600
            },
            lineStyle: {
              type: 'solid'
            },
            data: [
              [{ coord: [0, initialData.trendVO.intercept] }, { coord: [20, initialData.trendVO.slope * 20 + initialData.trendVO.intercept] }]
            ]
          }
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
docReady(trendChartInit);

