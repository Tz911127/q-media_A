<template>
  <div>
    <div :id="id" ref="addTerminal" style="height:320px"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  props: {
    dataMonth: {
      type: Array,
      default: () => []
    },
    title: String,
    id: String,
    value: Array,
    paidValue: Array,
    addCount: Array
  },
  data() {
    return {};
  },
  methods: {
    getInit() {
      var myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption({
        color: ["#3398DB", "#4CCA73", "red"],
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["新增合同金额", "已付款合同金额", "合同平均金额"],
          icon: "circle",
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dataMonth,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: "合同金额",
            type: "value",
            axisLine: {
              show: false
            }
          },
          {
            name: "合同平均金额",
            type: "value",
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "新增合同金额",
            type: "bar",
            data: this.value,
            barWidth: 15,
            stack: "0",
            label: {
              show: false,
              position: "insideRight"
            }
          },
          {
            name: "已付款合同金额",
            type: "bar",
            data: this.paidValue,
            barWidth: 15,
            stack: "1",
            label: {
              show: false,
              position: "insideRight"
            }
          },
          {
            name: "合同平均金额",
            type: "line",
            smooth: true,
            yAxisIndex: 1,
            data: this.addCount
          }
        ]
      });
    }
  },
  mounted() {
    this.getInit();
  }
};
</script>

<style lang="scss" scoped>
</style>