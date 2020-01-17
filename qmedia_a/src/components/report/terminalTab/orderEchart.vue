<template>
  <div>
    <div style="text-align:right">
      <el-date-picker
        size="mini"
        v-model="dateValue"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="yyyyMM"
      ></el-date-picker>
    </div>
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
    return {
      dateValue: ""
    };
  },
  methods: {
    getInit() {
      var myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption({
        color: ["#4CCA73", "#3398DB"],
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
          data: ["新增合同金额", "已付款合同金额"],
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
            barWidth: "60%",
            data: this.value,
            barWidth: 30,
            stack: "1",
            label: {
              show: false,
              position: "insideRight"
            }
          },
          {
            name: "已付款合同金额",
            type: "bar",
            barWidth: "60%",
            data: this.value,
            barWidth: 30,
            stack: "1",
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