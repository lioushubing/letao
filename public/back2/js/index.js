/**
 * Created by 54721 on 2018/11/27.
 */
$(function() {
  // 1. 柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
    // 标题
    title: {
      // 标题文本
      text: '2018年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data:['人数', '销量']
    },
    // x轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴, y轴的数据刻度, 需要通过数据的值, 动态生成
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',    // bar 柱状图,  line 折线图   pie 饼图
      data: [100, 60, 46, 40, 10, 20]
    },{
      name: '销量',
      type: 'bar',
      data: [50, 20, 66, 10, 10, 20]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);



  // 2. 饼图
  // 基于准备好的dom，初始化echarts实例
  var echarts_right = echarts.init(document.querySelector(".echarts_right"));

  // 指定图表的配置项和数据
  var option2 = {
    title : {
      // 主标题文本
      text: '热门品牌销售',
      // 副标题文本
      subtext: '2018年11月',
      // 水平居中
      x:'center',
      // 配置文本样式
      textStyle: {
        fontSize: 30,
        color: "#e92322"
      }
    },
    // 提示框组件
    tooltip : {
      // 鼠标悬停在数据项上时触发
      trigger: 'item',
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 垂直 vertical 水平 horizontal
      orient: 'vertical',
      left: "left",
      data: ['耐克','阿迪','老太太','老北京','回力']
    },
    // 系列列表
    series : [
      {
        name: '热门品牌',   // 系列名称
        type: 'pie',     // 饼状图
        // 圆的大小, 圆直径的大小
        radius : '55%',
        // 圆心的位置
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},    // 数据项名称
          {value:310, name:'阿迪'},
          {value:234, name:'老太太'},
          {value:135, name:'老北京'},
          {value:1548, name:'回力'}
        ],
        // 额外的阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'yellow'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option2);
})
