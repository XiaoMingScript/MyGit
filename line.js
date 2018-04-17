import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var arr1 = [];
  var arr2 = [];
  function arrTest() {
    wx.request({//微信小程序不支持JQuery，所以使用wx.requery方法
      url: 'https://****', //仅为示例，并非真实的接口地址
      dataType:JSON,
      data: {},
      dataType: "json",
      success: function (res) {
        
        if (res) {
          for (var i = 0; i < res.data.length; i++) {
            arr1.push(res.data[i].name);
            arr2.push(res.data[i].age);
          }
        }
        console.log(arr1.length);
        console.log("b");
        console.log(arr2.length);
      }
    })
    return arr1, arr2;
  }
  arrTest();
  setTimeout(op, 1000);//微信小程序会后加载异步数据，所以这里需要延迟执行渲染
  function op() {
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['数值']
      },
      grid: {
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: arr1.data

      },
      yAxis: {

        x: 'center',
        type: 'value'
      },
      series: [
        {
          name: 'CCPI(点)',
          type: 'line',
          itemStyle: {
            normal: {

              lineStyle: {
                width: 5,//折线宽度

              }


            }
          },
          stack: '元/吨',
          //areaStyle: {normal: {}},
          data: arr2
        }
      ]
    };
    chart.setOption(option);
    return chart;
  };
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady: function () {

  }
});