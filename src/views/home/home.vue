<template>
  <div>
    <div class="container-fluid">
      <el-row :gutter="10">
        <el-col :sm="6" :xs="12">
          <div class="grid-content bg-purple">
            <em>123</em>
            <span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>日新增文章数</b>
         </div>
        </el-col>
        <el-col :sm="6" :xs="12"><div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>评论总数</b>
        </div></el-col>
        <el-col :sm="6" :xs="12"><div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>日新增评论数</b>
        </div></el-col>
      </el-row>

    </div>
    <div class="container-fluid">
      <el-row :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="graph_pannel1" id="curve_show">
            1
          </div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="graph_pannel2" id="pie_show">
            2
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="container-fluid">
      <div class="graph_pannel" id="column_show">
      </div>
    </div>
  </div>
</template>

<script>
// 导入所有，形成一个对象使用
import * as echarts from 'echarts'

export default {
  name: 'home-page',
  mounted () {
    this.initCurveFn()
    this.initPieFn()
    this.initGraFn()
  },
  methods: {
    // 初始化
    initCurveFn () {
      const myChart = echarts.init(document.getElementById('curve_show'))
      myChart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      })
    },
    // 饼图
    initPieFn () {
      const pieChart = echarts.init(document.getElementById('pie_show'))
      pieChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    },
    // 柱状图
    initGraFn () {
      const graChart = echarts.init(document.getElementById('column_show'))
      graChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]

      })
    }

  }
}

</script>

<style scoped lang="less">

.container-fluid{
  width: 100%;
  height: 270px;
  border:1px solid #c9c8c8;
  margin-bottom:20px;
  background-color: #fff;

}
.el-row{
  margin-bottom:20px;

}
.grid-content{
  margin-bottom:10px;
  border:1px solid #c9c8c8;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;

  b{
    background-color: #c9c7c7;
    margin-top: 205.5px;
    margin-bottom: 0;
    width:220px;
    text-align: center;
  }
  em{
    color: aquamarine;
  }

}
.graph_pannel1{
  width: 550px;
  border:1px solid #c9c8c8;
  height:270px;

}
.graph_pannel2{
  border:1px solid #c9c8c8;
   height:270px;

}
.graph_pannel{
  width: 100%;
  height: 270px;
}

</style>
