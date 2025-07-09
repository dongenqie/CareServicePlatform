
export const echartsChinaMapInit = function echartsChinaMapInit(data) {
  // 找到新的容器
  var $el = document.querySelector('.echart-map-china-example');
  if (!$el) return;
  
  var chart = window.echarts.init($el);

  //var data;

  // 先显示 loading
  chart.showLoading();

  // 使用import加载本地China.json文件
  import('/src/json/China.json').then((geoJson) => {
    
    // 注册为 map 名字 “CN”
    echarts.registerMap('CN', geoJson);
    chart.hideLoading();
    chart.setOption({
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        textStyle: {
          color: '#333'
        },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: function (params) {
          return "<strong>" + params.data.name + " :</strong> " + params.data.value;
        }
      },
      toolbox: {
        show: false,
        feature: {
          restore: {}
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 100000,
        inRange: {
          color: ['#e0ffff', '#006edd']
        },
        text: ['High', 'Low'],
        calculable: true,
        textStyle: {
          color: '#666'
        },
        formatter: function (value) {
          return (value / 1000) + "k";
        }
      },
      series: [{
        left: 10,
        name: '中国省份数据',
        type: 'map',
        zoom: 1.2,
        roam: true,
        scaleLimit: {
          min: 1,
          max: 5
        },
        itemStyle: {
          borderColor: '#ccc'
        },
        label: {
          color: '#fff'
        },
        map: 'CN', // 注册的地图名称
        emphasis: {
          label: {
            show: true,
            color: '#fff'
          },
          itemStyle: {
            areaColor: '#ff6f61'
          }
        },
        data: data
      }]
    });
  }).catch(err => {
    console.error('加载中国地图失败', err);
    chart.hideLoading();
  });

  // reset 按钮
  document.querySelector('.china-map-reset').onclick = () => {
    chart.dispatchAction({ type: 'restore' });
  };
};


// docReady(echartsChinaMapInit);