<template>
  <section>
    <div id="echartsTime"></div>
  </section>
</template>
<script>
var echarts = require("echarts");
export default {
  props: {
    onlineReport: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      count: [],
      arrDataDuration: []
    };
  },
  methods: {
    getOptions() {
      var myChart = echarts.init(document.getElementById("echartsTime"));
      var data = this.data;
      var arrDataDuration = this.arrDataDuration;
      myChart.setOption({
        title: { text: "终端时长/小时" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {}
        },

        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#2288DB" },
            { offset: 1, color: "#88E291" }
          ])
        ],
        legend: {
          data: ["终端数", "终端时长/小时"]
        },

        xAxis: [
          {
            type: "category",
            data: this.count,
            axisPointer: {
              type: "shadow"
            },
            axisLine: {
              show: false
            },
            boundaryGap: false,
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
            name: "终端数",

            axisLabel: {
              formatter: "{value} "
            },
            axisLine: {
              show: false
            },

            splitLine: {
              show: false,
              lineStyle: {
                // 使用深浅的间隔色
                color: ["#f2f5f7"]
              }
            }
          },
          {
            type: "value",

            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            },
            splitLine: {
              show: false,
              lineStyle: {
                // 使用深浅的间隔色
                color: ["#f2f5f7"]
              }
            }
          }
        ],
        series: [
          {
            name: "终端数",
            type: "bar",
            barWidth: 15,
            data: data,
            itemStyle: {
              //折线拐点标志的样式
              color: "#FE9016"
            }
          },
          {
            name: "终端时长/小时",
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(5,140,255, 0.2)"
            },
            symbol: "none",
            itemStyle: {
              //折线拐点标志的样式
              color: "rgba(42, 185, 253, 1)"
              // color: "#FE9016"
            },
            data: arrDataDuration
          }
        ]
      });
    }
  },
  mounted() {
    let arr = [];
    let arrData = [];
    let arrDataDuration = [];
    for (let i in this.onlineReport) {
      arr.push(this.$filters.filterMonth(Number(i)));
      arrData.push(this.onlineReport[i].count);
      arrDataDuration.push(this.$filters.formatDuring(this.onlineReport[i].duration));
    }
    this.count = arr;
    this.data = arrData;
    this.arrDataDuration = arrDataDuration;
    this.getOptions();
  }
};
</script>
<style scope>
#echartsTime {
  background: #fff;
  /* width: 100%; */
  height: 420px;
  border-radius: 4px;
  padding: 10px 20px 10px 10px;
}
</style>