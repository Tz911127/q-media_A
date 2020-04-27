<template>
  <div>
    <div id="echart_matTime" style="width:100%; height:380px"></div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  props: {
    registReport: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      count: []
    };
  },
  methods: {
    getOptions() {
      var myChart = echarts.init(document.getElementById("echart_matTime"));
      myChart.setOption({
        title: {
          text: "新增终端",
          textStyle: {
            fontSize: 18
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["新增终端"]
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
            boundaryGap: false,
            data: this.count,
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                color: ["#f2f5f7"]
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            position: "left",
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0E1A21"
              }
            },

            splitNumber: 2,
            axisLabel: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ],
        series: [
          {
            name: "新增终端",
            type: "line",
            barWidth: 15,
            stack: "总量",
            smooth: true,
            label: {
              normal: {
                show: false,
                position: "left"
              }
            },
            symbol: "circle",
            itemStyle: {
              //折线拐点标志的样式
              color: "#FE9016"
            },
            lineStyle: {
              color: "#fff"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#54C25B" },
                { offset: 1, color: "#3EA5EB" }
              ])
            },
            data: this.data
          }
        ]
      });
    }
  },
  mounted() {
    let arr = [];
    let arrData = [];
    for (let i in this.registReport) {
      arr.push(this.$filters.formateDate(i));
      arrData.push((this.registReport[i]));
    }
    this.count = arr;
    this.data = arrData;
    this.getOptions();
  }
};
</script>