<template>
  <div>
    <div :id="id" ref="addTerminal" style="height:300px"></div>
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
    value: Array
  },
  data() {
    return {};
  },
  methods: {
    getInit() {
      var myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption({
        color: ["#3398DB"],
        title: {
          // text: this.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
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
            type: "value",
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: this.title,
            type: "bar",
            barWidth: "60%",
            data: this.value,
            barWidth: 30,
            label: {
              show: false,
              position: "insideRight"
            }
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