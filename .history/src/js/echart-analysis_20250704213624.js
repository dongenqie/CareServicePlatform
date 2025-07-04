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
          data: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年'], 
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
  var chartKeys = ['descriptive'];
  chartKeys.forEach(function (key) {
    var el = document.querySelector(".echart-analysis-".concat(key));
    el && initChart(el, getDefaultOptions(data.dataset[key][0], data.dataset[key][1], data.dataset[key][2]));
  });
};

/* -------------------------------------------------------------------------- */
/*                            Theme Initialization                            */
/* -------------------------------------------------------------------------- */
docReady(descriptiveChartInit);