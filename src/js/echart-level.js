//不同年份医院等级变化图
export const echartsNumberOfTicketsInit = function echartsNumberOfTicketsInit(apiData) {
  var $numberOfTickets = document.querySelector('.echart-number-of-tickets');
  if ($numberOfTickets) {
    var userOptions = utils.getData($numberOfTickets, 'options');
    var chart = window.echarts.init($numberOfTickets);
    var numberOfTicketsLegend = document.querySelectorAll('[data-number-of-tickets]');
    var xAxisData = ['2011', '2012', '2013', '2014', '2015'];
    var data1 = apiData.data1;
    console.log(data1);
    var data2 = apiData.data2;
    var data3 = apiData.data3;
    var data4 = apiData.data4;
    var emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3),
        borderRadius: [5, 5, 5, 5]
      }
    };
    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: [utils.getColor('primary'), utils.isDark() === 'dark' ? '#1E4C88' : '#94BCF1', utils.isDark() === 'dark' ? '#1A3A64' : '#C0D8F7', utils.isDark() === 'dark' ? '#225FAE' : '#6AA3ED'],
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getGrays()['900']
          },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          }
        },
        legend: {
          data: ['On Hold Tickets', 'Open Tickets', 'Due Tickets', 'Unassigned Tickets'],
          show: false
        },
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            color: utils.getGrays()['600']
          },
          axisLine: {
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'dashed'
            }
          },
          axisLabel: {
            color: utils.getGrays()['600']
          }
        },
        series: [{
          name: '1级医院',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1
        }, {
          name: '2级医院',
          type: 'bar',
          stack: 'two',
          emphasis: emphasisStyle,
          data: data2
        }, {
          name: '3级医院',
          type: 'bar',
          stack: 'three',
          emphasis: emphasisStyle,
          data: data3
        }, {
          name: '未评级医院',
          type: 'bar',
          stack: 'four',
          emphasis: emphasisStyle,
          data: data4
        }],
        itemStyle: {
          borderRadius: [3, 3, 0, 0]
        },
        barWidth: '12px',
        grid: {
          top: '10%',
          bottom: 0,
          left: 0,
          right: 0,
          containLabel: true
        }
      };
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
    numberOfTicketsLegend.forEach(function (el) {
      el.addEventListener('change', function () {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: utils.getData(el, 'number-of-tickets')
        });
      });
    });
  }
};