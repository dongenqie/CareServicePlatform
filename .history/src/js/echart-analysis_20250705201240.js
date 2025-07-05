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

var correlationChartInit = function correlationChartInit() {
  var $basicScatterChartEl = document.querySelector('.echart-analysis-correlation');
  if ($basicScatterChartEl) {
    // Get options from data attribute
    var userOptions = utils.getData($basicScatterChartEl, 'options');
    var chart = window.echarts.init($basicScatterChartEl);
    var getDefaultOptions = function getDefaultOptions() {
      return {
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
          // symbolSize: val => val[2] * 2,
          data: [[10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82], [9.15, 7.2], [11.5, 7.2], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47], [1.05, 3.33], [4.05, 4.96], [6.03, 7.24], [12.0, 6.26], [12.0, 8.84], [7.08, 5.82], [5.02, 5.68]],
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
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(descriptiveChartInit);
docReady(correlationChartInit);
